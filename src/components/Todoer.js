import {
    Card, CardContent, CardHeader,
    Checkbox, Divider,
    FormControl,
    FormControlLabel, FormLabel,
    IconButton, MenuItem,
    Radio, RadioGroup,
    Select, Table, TableBody, TableCell, TableHead, TableRow,
    TextField
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {useEffect, useState} from "react";
import TodoItem from "./TodoItem";
import TODOS from "../mocks/Todos";
import '../App.css';
import {makeStyles} from "@material-ui/core/styles";
import status from "../mocks/status";

const useStyles = makeStyles(theme => ({
    alignCenter: {
        textAlign: "center"
    },
    alignRight: {
        textAlign: "right"
    },
    selectStyle: {
        textAlign: "left",
        width: 150
    },
    textFieldStyle: {
        height: 40,
        backgroundColor: "red"
    }
}));

const radioOptions = [
    {label: "All", value: "all"},
    {label: "Completed", value: "completed"},
    {label: "On hold", value: "on-hold"}
];


const Todoer = () => {
    const classes = useStyles();

    const [isAllChecked, setIsAllChecked] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [todoCheckedList, setTodoCheckedList] = useState([]);
    const [selectedRadio, setSelectedRadio] = useState(radioOptions.value);
    const [todoFilteredBy, setTodoFilteredBy] = useState(status.COMPLETED);
    const [todo, setTodo] = useState({});

    useEffect(() => {
        setTodoList(TODOS);
    }, [todoList]);


    const onTodoTitleChange = (e) => setTodo({title: e.target.value});

    const handleTodoAdd = () => {
    }

    const onSelectAllChange = (e) => {
        setIsAllChecked(!isAllChecked);
        setTodoCheckedList(todoList.map(todo => todo.id));
        if (isAllChecked) {
            setTodoCheckedList([]);
        }
    }


    const handleClick = (e) => {
        const {id, checked} = e.target;
        setTodoCheckedList([...todoCheckedList, id]);
        if (!checked) {
            setTodoCheckedList(todoCheckedList.filter(todoID => todoID !== id));
        }
    }

    // console.log(todoCheckedList);


    const onFilterSelectChange = (e) => {
        setTodoFilteredBy(e.target.value);
    };

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
    };

    const todoItems = todoList.map(todo => <TodoItem key={todo.id}  {...todo}
                                                     classes={classes}
                                                     handleClick={handleClick}
                                                     isChecked={todoCheckedList.includes(todo.id)}/>)

    const radioItems = radioOptions.map((item, index) => <FormControlLabel key={index} label={item.label}
                                                                           control={<Radio name="sel"
                                                                                           value={item.value}
                                                                                           checked={selectedRadio === item.value}/>}
    />)

    return (
        <div className="col-lg-8">
            <Card>
                <CardHeader className={classes.alignCenter} title="Todoer" avatar="">
                </CardHeader>
                <Divider/>

                <CardContent className={classes.alignCenter}>
                    <FormControl>
                        <FormLabel className="mb-3"><h1>What do you want to do today ?</h1></FormLabel>
                        <div>
                            <TextField size="small" onChange={onTodoTitleChange}
                                       value={todo.title} variant="outlined"/>
                            <IconButton size="small"
                                        onClick={handleTodoAdd} type="submit">
                                <AddIcon/>
                            </IconButton>
                        </div>
                    </FormControl>


                    <Table className="mt-5" size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <FormControlLabel label="Select All" control={<Checkbox id="selectAll"
                                                                                            name="selectAll"
                                                                                            checked={isAllChecked}
                                                                                            onChange={onSelectAllChange}/>}
                                    />

                                    <FormControl size="small" variant="outlined">
                                        <Select  value={todoFilteredBy}
                                                onChange={onFilterSelectChange}>
                                            <MenuItem value={status.COMPLETED}>Completed</MenuItem>
                                            <MenuItem value={status.IN_PROGRESS}>In progress</MenuItem>
                                            <MenuItem value={status.ON_HOLD}>On Hold</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>

                                <TableCell>
                                    <FormControl component="fieldset">
                                        <RadioGroup row aria-label="quiz" name="quiz" value="1"
                                                    onChange={handleRadioChange}>
                                            {radioItems}
                                        </RadioGroup>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todoItems}
                        </TableBody>

                    </Table>
                </CardContent>
            </Card>
        </div>

    );
}

export default Todoer;
