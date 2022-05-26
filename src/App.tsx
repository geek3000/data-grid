import * as React from "react";
import {ReactGrid, Column, Row, CellChange, TextCell} from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import {FlagCellTemplate} from "./components/HeaderCellTemplate";
import {FaLink, FaPlus, FaTag, FaTextHeight, FaToggleOff} from "react-icons/fa";
import {BottomCellTemplate} from "./components/BottomAddCellTemplate";

interface Item {
    id: number;
    checked: boolean;
    text: string;
    url: string;
    ss: string;

}

interface HeaderRow extends Row {

    rowId: string;
    cells: any

}

interface BottomRow extends Row {
    rowId: string;
    cells: any
}

const getPeople = (): Item[] => [
    {id: 0, checked: true, text: "Jonatha Tagne", url: "https://google.com", ss: "LOW"},
    {id: 1, checked: false, text: "Goldman Richard", url: "https://google.com", ss: "MEDIUM"},
    {id: 2, checked: true, text: "Goldman Antoine", url: "https://google.com", ss: "HIGH"},
];

const getColumns = (): Column[] => [
    {columnId: "id", width: 50},
    {columnId: "bool", width: 150},
    {columnId: "text", width: 150},
    {columnId: "url", width: 150},
    {columnId: "ss", width: 150}
];

const headerRow: HeaderRow = {
    rowId: "header",
    cells: [
        {type: "header", text: ""},
        {type: "header", text: "Boolean", icon: <FaToggleOff/>},
        {type: "header", text: "Text", icon: <FaTextHeight/>},
        {type: "header", text: "URL", icon: <FaLink/>},
        {type: "header", text: "Single Select", icon: <FaTag/>}
    ]
};



type SelectType = {
    label: string
    value: string
}

const selectOptions: SelectType[] = [
    {label: "Low", value: "LOW"},
    {label: "Medium", value: "MEDIUM"},
    {label: "High", value: "HIGH"},
]

function App() {

    const [people, setPeople] = React.useState <Item[]>(getPeople());

    const columns = getColumns();



    const addRow = () => {
        let p = people;

        p.push(
            {id: 0, checked: true, text: "Jonatha Tagne", url: "https://google.com", ss: "LOW"},
        )

        setPeople((prevPeople) => p);

    }


    const bottomRow: BottomRow = {
        rowId: "bottom",
        cells: [
            {icon: <FaPlus/>, type: "bottom", text: "", change: (cell: CellChange) => {addRow()}},
            {type: "text", text: ""},
            {type: "text", text: ""},
            {type: "text", text: ""},
            {type: "text", text: ""},
        ]
    }


    const getRows = (people: Item[]): Row[] => [
        headerRow,
        ...people.map <Row>((item, idx) => ({
            rowId: idx,
            cells: [
                {type: "number", value: item.id},
                {type: "checkbox", checked: item.checked},
                {type: "text", text: item.text},
                {type: "email", text: item.url},
                {type: "dropdown", selectedValue: item.ss, values: selectOptions}
            ]
        })),
        bottomRow
    ];
    const rows = getRows(people);






    return (
        <div className="flex h-screen justify-center items-center">
            <ReactGrid
                rows={rows}
                columns={columns}
                customCellTemplates={{header: new FlagCellTemplate(), bottom: new BottomCellTemplate()}}
                enableRangeSelection={true}
                enableRowSelection
                enableColumnSelection
                enableFillHandle
            />
        </div>)
}

export default App