import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { useRouter } from 'next/router';
import axios from 'axios';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

// ----------------------------------------------------------------------

export default function MoreMenu(props) {
	const { moremenu, deleteOptions, id } = props
	const router = useRouter()
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

	const [disableDeleteButton, setDisableDeleteButton] = useState(false)

	async function deleteThisList() {
		setDisableDeleteButton(true)
		if(window.confirm(deleteOptions.note)) {
			try {
				const { data } = await axios.delete(deleteOptions.link, { data : {id}})	
				alert(data.message)
			} catch (error) {
				if(error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					alert(error.response.data)	
				} else 
					alert(error)
			}
			// dispatch({ type : 'refresh_start'})
		}
		setDisableDeleteButton(false)
	}

	const menuItem = moremenu.map((item, index) => {
		return (
			<MenuItem key={index} sx={{ color: 'text.secondary' }} onClick={() => router.push(item.link + id ) }>
				<ListItemIcon>
					<Icon icon={editFill} width={24} height={24} />
				</ListItemIcon>
				<ListItemText primary={item.name} primaryTypographyProps={{ variant: 'body2' }} />
			</MenuItem>
		)
	})

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 150, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
				{menuItem}
				{
					deleteOptions &&
        <MenuItem sx={{ color: 'text.secondary' }} 
					onClick={deleteThisList} disabled={disableDeleteButton}
					>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
				}
      </Menu>
    </>
  );
}
