
import React, { useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import * as formik from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { IoCloseCircleOutline } from "react-icons/io5";
import moment from 'moment'
import '../Form.css'

const FormChiTiet = ({data, close}) =>{
    console.log(data);
    const variants = {
        open: { backgroundColor: "rgba(0,0,0,0.6)" },
        closed: { backgroundColor: "rgba(0,0,0,0)" },
      };
      const modalVariants = {
        open: {
          opacity: 1,
          transition: { staggerChildren: 0.5, delayChildren: 0.2 },
        },
        closed: { opacity: 0 },
      };

      const { Formik } = formik;

      const onSubmitForm = () =>{
        console.log("submit");
      }

      


    return(
        
        <motion.div className="overlay" key="overlay"
            variants={variants} initial={"closed"} 
            onClick={close} animate={"open"} exit={"closed"}  
        >
            <motion.div className="modal" variants={modalVariants} onClick={(e) => e.stopPropagation()} >

            <motion.button className="modal__close-wrapper" whileHover={{ scale: 1.2 }} onClick={close} >
                <IoCloseCircleOutline className="modal__close-icon" />
            </motion.button>

            <Formik
                onSubmit={onSubmitForm}
                initialValues={data[0]}
            >
                {({handleChange, handleBlur, values, touched, errors}) =>(
                    <Form noValidate onSubmit={(e)=>close()} className="w-75 d-flex flex-column justify-content-center">
                        <Form.Group as='div' className="position-relative mb-5 cf-title-12">
                            <Form.Label className="w-100 text-center h1" >Chi tiết tài khoản</Form.Label>
                        </Form.Group>

                        <Row>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>ID</Form.Label>

                                <Form.Control name="idtaikhoan"
                                    type="text"
                                    disabled
                                    value={values.idtaikhoan}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label >TÊN ĐĂNG NHẬP</Form.Label>

                                <Form.Control name="tendangnhap"
                                    type="text"
                                    disabled
                                    value={values.tendangnhap}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>MẬT KHẨU</Form.Label>

                                <Form.Control name="matkhau"
                                    type="text"
                                    disabled
                                    value={values.matkhau}
                                />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="position-relative mb-3">
                                <Form.Label>VAI TRÒ</Form.Label>

                                <Form.Control name="vaitro"
                                    type="text"
                                    disabled
                                    value={values.vaitro}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>CHỨC VỤ</Form.Label>

                                <Form.Control name="chucvu"
                                    type="text"
                                    disabled
                                    value={values.chucvu}
                                />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="position-relative mb-3">
                                <Form.Label>HỌ VÀ TÊN</Form.Label>

                                <Form.Control name="hovaten"
                                    type="text"
                                    disabled
                                    value={values.hovaten}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>NGÀY SINH</Form.Label>

                                <Form.Control name="ngaysinh"
                                    type="text"
                                    disabled
                                    value={values.ngaysinh}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>SỐ CCCD</Form.Label>
                                <Form.Control name="socccd"
                                    type="text"
                                    disabled
                                    value={values.socccd ? values.socccd : 'Không xác định'}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>SỐ ĐIỆN THOẠI</Form.Label>
                                <Form.Control name="sodienthoai"
                                    type="text"
                                    disabled
                                    value={values.sodienthoai}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>GIỚI TÍNH</Form.Label>

                                <Form.Control name="gioitinh"
                                    type="text"
                                    disabled
                                    value={values.gioitinh}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>ĐỊA CHỈ</Form.Label>
                                <Form.Control name="diachi"
                                    type="text"
                                    disabled
                                    value={values.diachi}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>QUÊ QUÁN</Form.Label>

                                <Form.Control name="quequan"
                                    type="text"
                                    disabled
                                    value={values.quequan}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>EMAIL</Form.Label>

                                <Form.Control name="email"
                                    type="email"
                                    disabled
                                    value={values.email}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>SỐ LẦN TRỄ HẠN</Form.Label>

                                <Form.Control name="diemtru"
                                    type="text"
                                    disabled
                                    value={values.diemtru ? values.diemtru : "KHÔNG XÁC ĐỊNH"}
                                />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="position-relative mb-3">
                                <Form.Label>NGÀY CẤP</Form.Label>

                                <Form.Control name="ngaycap"
                                    type="text"
                                    disabled
                                    value={values.ngaycap}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>NGÀY HẾT HẠN</Form.Label>

                                <Form.Control name="ngayhethan"
                                    type="text"
                                    disabled
                                    value={values.ngayhethan}
                                />
                            </Form.Group>
                        </Row>
                        
                        <Form.Group className="position-relative mt-5 w-100 d-flex justify-content-center">
                            <button className="button-89" type="submit" onClick={close}>Thoát</button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
            </motion.div>
        </motion.div>
    )
}

export default FormChiTiet;