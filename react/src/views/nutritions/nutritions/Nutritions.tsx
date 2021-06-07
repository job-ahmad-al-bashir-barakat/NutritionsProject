import React from 'react';
import {Table} from "components/index";
import { Container, Row, Col } from 'react-bootstrap';
import {deleteNutrition, getNutritions} from "../queries";

import './Nutritions.scss';

function Nutritions() {

    //todo: Sort from server
    const columns = React.useMemo(
        () => [
            {
                Header: 'Dessert (100g serving)',
                accessor: 'dessert',
                sortable: true,
                sortable_type: 'alpha'
            },
            {
                Header: 'Calories',
                accessor: 'nutritionInfo.calories',
                sortable: true,
                sortable_type: 'numeric'
            },
            {
                Header: 'Fat (g)',
                accessor: 'nutritionInfo.fat',
                sortable: true,
                sortable_type: 'numeric'
            },
            {
                Header: 'Carb (g)',
                accessor: 'nutritionInfo.carb',
                sortable: true,
                sortable_type: 'numeric'
            },
            {
                Header: 'Protein (g)',
                accessor: 'nutritionInfo.protein',
                sortable: true,
                sortable_type: 'numeric'
            }
        ],
        []
    )

    return (
        <div className="nutritions-wrapper">
            <div className="nutritions-inner">
                <Container fluid>
                    <Row>
                        <Col>
                            <Table title="Nutrition List"
                                   columns={columns}
                                   query={getNutritions}
                                   queryDelete={deleteNutrition}
                                   formatter={(data:any) => data ? data.nutritions : []}
                                   deleteFormatter={(data:any) => data ? data.deleteNutrition : []}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Nutritions;
