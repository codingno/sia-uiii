import BasicLayout from "../../../components/utils/BasicLayout";

import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PrintIcon from '@mui/icons-material/Print';
import Box from "@mui/material/Box";
import plusFill from "@iconify/icons-eva/plus-fill";
import editFill from "@iconify/icons-eva/edit-fill";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  Divider,
  Grid,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
} from "@mui/material";
// import Scrollbar from "../../../components/utils/Scrollbar";
import Scrollbar from "../../../components/utils/Scrollbar";
import SearchNotFound from "../../../components/utils/SearchNotFound";
import { CategoryListHead } from "../../../components/utils/courses-selection";
import TopMenu from "../../../components/utils/TopMenu";
import MoreMenu from "../../../components/utils/MoreMenu";
import ListToolbar from "../../../components/utils/ListToolbarCourseSelection";

import axios from "axios";
import { useSession } from "next-auth/react"

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
  return order === "desc"
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
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

export default function (props) {
  // const { title, name, tableHead, getUrl, addLink, moremenu, deleteOptions, isUserList } =
    // props;
		const { data: session, status : statusSession } = useSession()
		const { isUserList } = props

		const
        title="Course Selection",
        name="Selection",
        getUrl="/api/academic-krs",
        addLink="/academic/courses-selection/create",
        tableHead=[
          { id: "name", label: "Course", alignRight: false },
          { id: "credits", label: "Credits", alignRight: false },
          { id: "semester", label: "Semester", alignRight: false },
          { id: "day_name", label: "Day", alignRight: false },
          { id: "room_name", label: "Room", alignRight: false },
          { id: "teacher_name", label: "Teacher", alignRight: false },
          { id: "" },
        ],
        moremenu=[
          {
            name: "Edit",
            link: "/academic/courses-selection/edit/",
          },
        ],
        deleteOptions={
          link: "/api/academic-krs/",
          note: "Are you sure to delete this item?",
        };

  const router = useRouter();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isLoading, setLoading] = useState(false);
	
	const [mode, setMode] = useState(0)
  const [dataList, setDataList] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataList.map((n) => n.name);
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

	async function saveCourseSelection() {
		try {
			const preparedData = dataList.filter(function(item) { 
				return this.indexOf(item.id) >= 0 
			}, selected).map(item => {
				return {
					// student_number : session.user.student_number,
					// semester : item.semester,
					schedule_id : item.id,
				}
			})
			console.log(preparedData);
			const { data } = axios.post('/api/academic-krs', preparedData)
      console.log(`🚀 ~ file: index.jsx ~ line 185 ~ saveCourseSelection ~ data`, data)
		} catch (error) {
      console.log(`🚀 ~ file: index.jsx ~ line 186 ~ saveCourseSelection ~ error`, error)
			alert(error)	
		}	
	}

  useEffect(() => {
    getDataList();
  }, [mode]);

  async function getDataList() {
    try {
      const { data, error } = await axios.get(mode ? `/api/academic-schedule` : getUrl);
			if(mode) {
      	setDataList(data.data);
				setSelected(selectedSchedule)
			}
			else {
				const list = data.data.map(item => item.schedule)
        console.log(`🚀 ~ file: index.jsx ~ line 203 ~ getDataList ~ list`, list)
      	setDataList(list);
				const ids = list.map(item => item.id)
				setSelectedSchedule(ids)
				setSelected([])
			}
    } catch (error) {
      if (error.response) {
        if ((error.response.status = 404)) return;
      }
      alert(error);
    }
  }

  const courseList = [
    {
      id: 1,
      name: "Faculty of Education",
      // code : 'FE2021',
      status: "Active",
    },
    {
      id: 2,
      name: "Faculty of Islamic Studies",
      // code : 'FIS2021',
      status: "Active",
    },
    {
      id: 3,
      name: "Faculty of Social Sciences",
      // code : 'FSS2021',
      status: "Non Active",
    },
  ];

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataList.length) : 0;

  // const filteredUsers = courseList ? applySortFilter(courseList, getComparator(order, orderBy), filterName) : [];
  const filteredUsers =
    dataList.length > 0
      ? applySortFilter(dataList, getComparator(order, orderBy), filterName)
      : [];
  const isUserNotFound = filteredUsers.length === 0;
  return (
    <BasicLayout title="Course Selection">
      <Grid item xs={10} p={1}>
        <Card
					sx={{
						maxHeight : `calc(100vh + ${-120 + (emptyRows * 47) + 52}px)`,
					}}
				>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p={5}
						pb={1}
          >
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
						<Box>

							{
								!mode &&
            <Button
              variant="contained"
							color="secondary"
              onClick={() => router.push(router.pathname + '/pdf')}
              startIcon={!mode && <Icon icon={PrintIcon} />}
							sx={{ m : 1 }}
            >
							Course Registration Card
            </Button>
							}
            <Button
              variant="contained"
              onClick={() => setMode(!mode)}
              startIcon={!mode && <Icon icon={editFill} />}
            >
							{
								mode ?
								'Close Edit' :
              	'Edit ' + name
							}
            </Button>
						</Box>
          </Stack>
          <Divider />

          <ListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            toolbarName={name}
						saveCourseSelection={saveCourseSelection}
            // refresh={() => dispatch({type : 'refresh_start'})}
          />

          <Scrollbar>
            {isLoading ? (
              <div
                style={{
                  margin: "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <TableContainer
              // sx={{ minWidth: 800 }}
              >
                <Table size="small">
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, indexRow) => {
                        const {
                          id,
                          name,
                          shortname,
                          code,
                          category_code,
                          position,
                          status,
                          image_url,
                          user_enrollment,
                          createdBy,
                        } = row;
                        const isItemSelected = selected.indexOf(id) !== -1;
												let tempRow = JSON.parse(JSON.stringify(row))

                        // delete row.id;
                        const tableHeadId = tableHead.map((item) => item.id);
                        tableHeadId.pop()
                        Object.keys(tempRow).map((item) => {
                          if (tableHeadId.indexOf(item) < 0) {
														if(isUserList && item == 'user')
															row.name = row.user.name
														delete tempRow[item];
													}
                        });
												const arrayRow = Object.keys(tempRow)
												if(isUserList) {
													arrayRow.unshift(arrayRow[arrayRow.length - 1])
													arrayRow.pop()
												}
                        const columCell = tableHeadId.map(
                          (item, index) => {
                            return (
                              <TableCell align="left" key={index}>
                                <Stack
                                  direction="row"
                                  alignItems="left"
                                  spacing={1}
                                >
                                  <Typography variant="subtitle2" noWrap>
                                    {tempRow[item]}
                                  </Typography>
                                </Stack>
                              </TableCell>
                            );
                          }
                        );
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
                              bgcolor: indexRow % 2 > 0 ? "#F4F4F4" : "#E9E9E9",
                            }}
                          >
                            <TableCell padding="checkbox" key="uniqueKey1">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, id)}
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
                            {
                              <TableCell align="right">
                                <MoreMenu
                                  id={id}
                                  name={name}
                                  moremenu={moremenu}
                                  deleteOptions={deleteOptions}
                                />
                              </TableCell>
                            }
                          </TableRow>
                        );
                      })}
                    {/* {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )} */}
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
            )}
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
      </Grid>
		</BasicLayout>
  );
}
