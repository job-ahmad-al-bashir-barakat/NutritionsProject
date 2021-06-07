import React, {useEffect, useState} from 'react';
import { useTable, useSortBy } from 'react-table';
import { useQuery, useMutation } from "@apollo/client";
import BTable from 'react-bootstrap/Table';
import {Button} from "react-bootstrap";
import { useHistory } from "react-router-dom";

import './Table.scss';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faRedo, faTrash ,faPlus ,faCheck ,faSortAlphaDownAlt, faSortAlphaUpAlt, faSortNumericDownAlt, faSortNumericUpAlt } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from "../loaders";

function CTable({ title, columns, data, deleteRow, refetchCallback, selectedCount }:any) {

    let history = useHistory();

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
    {
        columns,
        data,
    },useSortBy);

    let goToNutritionCreate = () => {
        history.push("/nutrition/create");
    };

    let deleteNutritions = () => {
        data.filter((item:any) => item.selected == true).map((item:any) => {
            deleteRow({ variables: { id: `${item.id}` }});
        })
    }

    // Render the UI for your table
    return (
        <div className="rt-wrapper">
            <div className={`rt-top-header ${ !title ? 'rt-no-title': '' }`}>
                {title ? (<h1>{title}</h1>) : null}
                <Button variant="success" onClick={refetchCallback} size="lg"><FontAwesomeIcon icon={faRedo} /> RESET DATA</Button>
            </div>
            <div className="rt-header">
                <div className="rt-selected-counter">
                    <p className="m-0">{ selectedCount } selected</p>
                </div>
                <div className="rt-btns">
                    <Button variant="white" onClick={goToNutritionCreate} size="lg"><FontAwesomeIcon icon={faPlus} /> ADD NEW</Button>
                    <Button variant="white" onClick={deleteNutritions} size="lg" disabled={ !selectedCount }><FontAwesomeIcon icon={faTrash} /> DELETE</Button>
                </div>
            </div>
            <div className="rt-content">
                <BTable hover size="sm" {...getTableProps()}>
                    <thead>
                    {headerGroups.map((headerGroup:any) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column:any) => {
                                let getSortByToggleProps:any = column.sortable ? column.getSortByToggleProps() : {};
                                return (
                                    // Add the sorting props to control sorting. For this example
                                    // we can add them into the header props
                                    <th {...column.getHeaderProps(getSortByToggleProps)}>
                                        <span>{column.render('Header')}</span>
                                        {/* Add a sort direction indicator */}
                                        <span className="rt-sort">
                                        {
                                            column.sortable && column.sortable_type == 'alpha'  ?
                                                column.isSorted ?
                                                    column.isSortedDesc
                                                        ? <FontAwesomeIcon icon={faSortAlphaDownAlt} />
                                                        : <FontAwesomeIcon icon={faSortAlphaUpAlt} />
                                                : null
                                            : null
                                        }
                                        {
                                            column.sortable && column.sortable_type == 'numeric' ?
                                                column.isSorted ?
                                                    column.isSortedDesc
                                                        ? <FontAwesomeIcon icon={faSortNumericDownAlt} />
                                                        : <FontAwesomeIcon icon={faSortNumericUpAlt} />
                                                : null
                                            : null

                                        }
                                        </span>
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell:any) => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>
                            )}
                    )}
                    </tbody>
                </BTable>
            </div>
        </div>
    )
}

export default function Table({ title, columns, query, queryDelete, formatter, deleteFormatter }:any) {

    let [selectedCount, setSelectedCount] = useState(0 as number);
    let [_data, _setData] = useState([] as any);

    let checkClicked = (row:any, isAll:boolean) => {

        if(isAll) {
            let checkIfSelecedExists = _data.filter((item:any) => item.selected == true).length ;
            _setData(_data.map((item:any) => {
                item.selected = checkIfSelecedExists ? false : true;
                return item
            }))
        } else {
            _setData(_data.map((item:any) => {
                if(row.id == item.id) {
                    item.selected = !item.selected;
                }

                return item
            }))
        }

        // get number of selected item
        setSelectedCount(_data.filter((item:any) => item.selected == true).length);
    }

    var _columns = [ {
        Header: (props:any) => {
            return (
                <span className="rt-check" onClick={() => checkClicked(null, true)}>
                    { props.rows.filter((item:any) => item.original.selected == true).length ? <FontAwesomeIcon icon={faCheck}/> : null}
                </span>
            )
        },
        accessor: "checkTable",
        Cell: (props:any) => {
            return (
                <span className="rt-check" onClick={() => checkClicked(props.row.original, false)}>{
                    props.row.original.selected ? <FontAwesomeIcon icon={faCheck}/> : null
                }</span>
            )
        }
    }, ...columns ];

    const {loading: dataLoading, error, data, refetch} = useQuery(query, {onCompleted: (data) => {
        _setData(formatter(data).map((item:any) => ({ ...item, selected: false })));
        console.log(data);
    }});

    const [deleteRow, { loading: deleteLoaing, data: rowData }] = useMutation(queryDelete, {
        refetchQueries: [{ query: query }],
        onCompleted: (data) => {
            _setData(_data.filter((item:any) => item.id != deleteFormatter(data).id));
        }
    });

    let refetchCallback = () => {
        refetch();
        setSelectedCount(0);
        _setData(formatter(data).map((item:any) => ({ ...item, selected: false })));
    };

    if (dataLoading || deleteLoaing) return <Spinner/>;
    if (error) return <p>Error :(</p>;

    return (
        <CTable title={title} columns={_columns} data={_data} deleteRow={deleteRow} refetchCallback={refetchCallback} selectedCount={selectedCount}/>
    )
}
