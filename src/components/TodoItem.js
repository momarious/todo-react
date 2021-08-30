import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton, MenuItem,
    Select,
    Table,
    TableBody, TableCell, TableRow
} from "@material-ui/core";
import {CheckBox, Delete, Edit, Label, TableChart} from "@material-ui/icons";
import status from "../mocks/status";
import {red} from "@material-ui/core/colors";
import {useState} from "react";

const TodoItem = (props) => {

    const [todoStatus, setTodoStatus] = useState(props.status);

    const handleEditBtnClicked = () => {

    }

    const handleDeleteBtnClicked = () => {

    }

    const handleTodoStatusChange = (e) => {
        setTodoStatus(e.target.value);
    }


    return (
        <TableRow>
            <TableCell width="50%">
                <FormControlLabel label={props.title}
                                  control={<Checkbox onChange={props.handleClick}
                                                     checked={props.isChecked}
                                                     id={props.id}
                                                     title={props.title}
                                  />}
                />
            </TableCell>
            <TableCell className={props.classes.alignRight} width="50%">
                <FormControl size="small" variant="outlined">
                    <Select className={props.classes.selectStyle} value={todoStatus}
                            onChange={handleTodoStatusChange}>
                        <MenuItem value={status.IN_PROGRESS}>{status.IN_PROGRESS}</MenuItem>
                        <MenuItem value={status.ON_HOLD}>{status.ON_HOLD}</MenuItem>
                        <MenuItem value={status.COMPLETED}>{status.COMPLETED}</MenuItem>
                    </Select>
                </FormControl>


                <IconButton size="small" onClick={handleEditBtnClicked} type="submit">
                    <Edit/>
                </IconButton>

                <IconButton size="small" onClick={handleDeleteBtnClicked} type="submit">
                    <Delete/>
                </IconButton>
            </TableCell>
        </TableRow>


    )
}

export default TodoItem;
