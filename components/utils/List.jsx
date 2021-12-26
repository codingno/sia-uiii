import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
	Divider,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
	CircularProgress,
} from '@mui/material';
import Scrollbar from './Scrollbar';
import SearchNotFound from './SearchNotFound';
import { CategoryListHead } from './course';
import TopMenu from './TopMenu';
import MoreMenu from './MoreMenu';
import ListToolbar from './ListToolbar';

import axios from 'axios';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

export default function List(props) {
	const { 
		title, 
		name, 
		tableHead,
		getUrl, 
		addLink, 
		moremenu, 
		deleteOptions 
	} = props

	const router = useRouter()

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

	const [isLoading, setLoading] = useState(false)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = courses.map((n) => n.code);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

	const [dataList, setDataList] = useState([])

	useEffect(() => {
		getDataList()	
	}, [dataList])

	async function getDataList() {
		try {
			const { data, error }	 = await axios.get(getUrl)
			setDataList(data.data)
		} catch (error) {
			if(error.response) {
				if(error.response.status = 404)
					return
			}
			alert(error)	
		}	
	}

  const courseList =  [
		{
			id : 1,
			name : 'Faculty of Education',
			// code : 'FE2021',
			status : 'Active',
		},
		{
			id : 2,
			name : 'Faculty of Islamic Studies',
			// code : 'FIS2021',
			status : 'Active',
		},
		{
			id : 3,
			name : 'Faculty of Social Sciences',
			// code : 'FSS2021',
			status : 'Non Active',
		},
	];

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courses.length) : 0;

  // const filteredUsers = courseList ? applySortFilter(courseList, getComparator(order, orderBy), filterName) : [];
  const filteredUsers = dataList.length > 0 ? applySortFilter(dataList, getComparator(order, orderBy), filterName) : [];
  const isUserNotFound = filteredUsers.length === 0;
  return ( 
			<>
      <Container>
        <Card>
        <Stack direction="row" alignItems="center" justifyContent="space-between" p={5}>
          <Typography variant="h5" gutterBottom>
						{title}
          </Typography>
          <Button
            variant="contained"
						onClick={() => router.push(addLink)}
            startIcon={<Icon icon={plusFill} />}
          >
            Add {name}
          </Button>
        </Stack>
				<Divider />

          <ListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
						toolbarName={name}
						// refresh={() => dispatch({type : 'refresh_start'})}
          />

          <Scrollbar>
					{
						isLoading ?
						<div style={{ margin: 'auto', display: 'flex', justifyContent: 'center'}}>
							<CircularProgress /> 
						</div> :
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <CategoryListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={tableHead}
                  rowCount={dataList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, indexRow) => {
                      const { id, name, shortname, code, category_code, position, status, image_url, user_enrollment, createdBy } = row;
                      const isItemSelected = selected.indexOf(code) !== -1;

											delete row.id
											const tableHeadId = tableHead.map(item => item.id)
											Object.keys(row).map(item => {
												if(tableHeadId.indexOf(item) < 0)
													delete row[item]
											})
											const columCell = Object.keys(row).map((item, index) => {
												return (
                          <TableCell align="left" key={index}>
                            <Stack direction="row" alignItems="left" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
																{row[item]}
                              </Typography>
                            </Stack>
                          </TableCell>
												)
											})
                      // if(user.role_id == 1 || user_enrollment.split(',').indexOf(user.id) >= 0 || createdBy == user.id)
                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
													sx={{
														bgcolor : indexRow % 2 > 0 ? '#F4F4F4' : '#E9E9E9'
													}}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, code)}
                            />
                          </TableCell>
													{columCell}
                          {/* <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
																{name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{status || "None"}</TableCell> */}
                          {<TableCell align="right">
                            <MoreMenu
															id={id} 
															name={name}
															moremenu={moremenu}
															deleteOptions={deleteOptions}
															/>
                          </TableCell>}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
					}
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
			</>
  );
}
