import React from 'react';
import {Alert} from "react-bootstrap";
import {useHistory} from 'react-router-dom';
import {useMutation} from "@apollo/client";
import {Field, Form, Formik} from "formik";
import {Container, Row, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import * as Yup from 'yup';

import {createNutrition, getNutritions} from "../queries";

import './NutritionCreate.scss';

function NutritionCreate() {

    let history = useHistory();

    const [addRow, { loading: addLoaing, data: rowData }] = useMutation(createNutrition, {
        refetchQueries: [{ query: getNutritions }],
        awaitRefetchQueries: true,
    });

    return (

        <Container>
            <Row>
                <Col className="col-lg-6 col-md-12 m-auto">
                    <div className="nutrition-create-form">
                        <Alert variant="warning">
                            <FontAwesomeIcon icon={faExclamationTriangle}/>
                            Please fill All detail bedore you submit
                        </Alert>

                        <Formik
                            initialValues={{
                                dessert: '',
                                calories: '',
                                fat: '',
                                carb: '',
                                protein: ''
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                                await new Promise((resolve:any) => {
                                    setSubmitting(true);
                                    addRow({ variables: values }).then(() => {
                                        setSubmitting(false);
                                        history.push('/');
                                        resolve();
                                    });
                                });
                            }}
                            validationSchema={Yup.object({
                                dessert: Yup.string().required('Dessert is required'),
                                calories: Yup.number().required('Calories is required'),
                                fat: Yup.number().required('Fat is required'),
                                carb: Yup.number().required('Carb is required'),
                                protein: Yup.number().required('Protein is required'),
                            })}
                        >
                            {(formik:any) => (
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="dessert">Dessert*</label>
                                        <Field id="dessert" name="dessert" type="text" className={(formik.touched.dessert && formik.errors.dessert) ? 'form-control is-invalid' : 'form-control'}/>
                                        {formik.touched.dessert && formik.errors.dessert ? (
                                            <div className="invalid-feedback">{formik.errors.dessert}</div>
                                        ) : null}
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="calories">Calories*</label>
                                        <Field id="calories" name="calories" type="number" className={(formik.touched.calories && formik.errors.calories) ? 'form-control is-invalid' : 'form-control'}/>
                                        {formik.touched.calories && formik.errors.calories ? (
                                            <div className="invalid-feedback">{formik.errors.calories}</div>
                                        ) : null}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="fat">Fat*</label>
                                        <Field id="fat" name="fat" type="number"  className={(formik.touched.fat && formik.errors.fat) ? 'form-control is-invalid' : 'form-control'}/>
                                        {formik.touched.fat && formik.errors.fat ? (
                                            <div className="invalid-feedback">{formik.errors.fat}</div>
                                        ) : null}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="carb">Carb*</label>
                                        <Field id="carb" name="carb" type="number"  className={(formik.touched.carb && formik.errors.carb) ? 'form-control is-invalid' : 'form-control'}/>
                                        {formik.touched.carb && formik.errors.carb ? (
                                            <div className="invalid-feedback">{formik.errors.fat}</div>
                                        ) : null}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="protein">Protein*</label>
                                        <Field id="protein" name="protein" type="number"  className={(formik.touched.protein && formik.errors.protein) ? 'form-control is-invalid' : 'form-control'}/>
                                        {formik.touched.protein && formik.errors.protein ? (
                                            <div className="invalid-feedback">{formik.errors.fat}</div>
                                        ) : null}
                                    </div>

                                    <button type="submit" className="btn btn-success btn-block" disabled={formik.isSubmitting}>
                                        <FontAwesomeIcon icon={faCheck}/> {formik.isSubmitting ? "Please wait..." : "Submit"}
                                    </button>
                                </Form>
                            )}

                        </Formik>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default NutritionCreate;
