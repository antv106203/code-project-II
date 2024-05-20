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
import '../Form.css';

const FormSuaThongTin = ({data, close}) =>{

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
    const onSubmitForm = async(value) =>{
        console.log("thay đổi thông tin");
        try {
            let response = await axios.post('http://localhost:4000/api/users/put', value);
            if (response.data === "Cập nhật tài khoản thành công") {
              console.log("Thay đổi thành công");
            }
          } catch (error) {
            console.log("Đã xảy ra lỗi khi cập nhật tài khoản:", error);
          }
      }

    

    const schema  = yup.object().shape({
        matkhau: yup.string().required('Vui lòng nhập mật khẩu'),
        hovaten: yup.string().required('Vui lòng nhập họ và tên'),
        ngaysing: yup.string().required('Vui lòng nhập ngày sinh'),
        socccd: yup.string().nullable(),
        sodienthoai: yup.string().required('Vui lòng nhập số điện thoại'),
        gioitinh: yup.string().required('Vui lòng nhập giới tính'),
        diachi: yup.string().required('Vui lòng nhập địa chỉ'),
        quequan: yup.string().required('Vui lòng nhập quê quán'),
        email: yup.string().required('Vui lòng nhập email'),
        

    });
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
                validationSchema={schema}
                onSubmit={onSubmitForm}
                initialValues={data[0]}
            >
                {({handleSubmit ,handleChange, handleBlur, values, touched, errors}) =>(
                    <Form noValidate onSubmit={handleSubmit} className="w-75 d-flex flex-column justify-content-center">
                        <Form.Group as='div' className="position-relative mb-5 cf-title-12">
                            <Form.Label className="w-100 text-center h1" >Sửa thông tin tài khoản</Form.Label>
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
                                    onChange={handleChange}
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
                                    value={values.hovaten}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>NGÀY SINH</Form.Label>

                                <Form.Control name="ngaysinh"
                                    type="text"
                                    value={values.ngaysinh}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>SỐ CCCD</Form.Label>
                                <Form.Control name="socccd"
                                    type="text"
                                    value={values.socccd ? values.socccd : 'Không xác định'}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>SỐ ĐIỆN THOẠI</Form.Label>
                                <Form.Control name="sodienthoai"
                                    type="text"
                                    value={values.sodienthoai}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>GIỚI TÍNH</Form.Label>

                                <Form.Control name="gioitinh"
                                    type="text"
                                    value={values.gioitinh}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>ĐỊA CHỈ</Form.Label>
                                <Form.Control name="diachi"
                                    type="text"
                                    value={values.diachi}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>QUÊ QUÁN</Form.Label>

                                <Form.Control name="quequan"
                                    type="text"
                                    value={values.quequan}
                                />
                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>EMAIL</Form.Label>

                                <Form.Control name="email"
                                    type="email"
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
                            <button className="button-89" type="submit" onClick={close} style={{marginRight: '30px'}}>Thoát</button>
                            <button className="button-89" type="submit" onClick={handleSubmit}>Thay Đổi</button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
            </motion.div>
        </motion.div>
    )
}

export default FormSuaThongTin;