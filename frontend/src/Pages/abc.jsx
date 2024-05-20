<form>
                    <div className="d-flex">
                        <div class="mb-3 me-3 mr-3">
                            <label htmlFor="tendangnhap" class="form-label">Tên đăng nhập (*)</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="tendangnhap" 
                                placeholder="Tên đăng nhập"
                                onChange={(e) => setInformation((prev) => ({
                                    ...prev,
                                    tendangnhap: e.target.value
                                }))}
                            
                            />
                        </div>
                        <div class="mb-3 me-3 mr-3">
                            <label htmlFor="matkhau" class="form-label">MẬT KHẨU (*)</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="matkhau" 
                                placeholder="Mật khẩu"
                                onChange={(e) => setInformation((prev) => ({
                                    ...prev,
                                    matkhau: e.target.value
                                }))}
                            
                            />
                        </div>

                        <div class="mb-3">
                            <label for="vaitro" class="form-label">VAI TRÒ (*)</label>
                            <select className="form-select " id="vaitro" onChange={(e) => setInformation((prev) => ({
                                ...prev,
                                vaitro: e.target.value
                            }))}>
                                <option value="" disabled selected>Chọn Vai trò</option>
                                <option value="manager">Quản lý</option>
                                <option value="staff">Nhân viên</option>
                                <option value="admin">Admin</option>
                                <option value="user">Bạn đọc</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label htmlFor="hovaten" class="form-label">HỌ VÀ TÊN (*)</label>
                        <input 
                            type="text" 
                            class="form-control"
                            name="hovaten"
                            id="hovaten"
                            placeholder="Họ Và Tên"
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div class="mb-3">
                        <label htmlFor="ngaysinh" class="form-label">Ngày sinh (*)</label>
                        <input 
                            type="text" 
                            class="form-control"
                            name="ngaysinh"
                            id="ngaysinh"
                            placeholder="Ngày sinh theo định dạng yyyy-mm-dd"
                            onChange={handleChange}
                        />
                    </div>

                    <div class="mb-3">
                        <label htmlFor="socccd" class="form-label">Số căn cước công dân</label>
                        <input 
                            type="text" 
                            class="form-control"
                            name="socccd"
                            id="socccd"
                            placeholder="SỐ CCCD"
                            onChange={handleChange}
                        />
                    </div>

                    <div class="mb-3">
                        <label htmlFor="sodienthoai" class="form-label">Số Điện Thoại</label>
                        <input 
                            type="text" 
                            class="form-control"
                            name="sodienthoai"
                            id="sodienthoai"
                            placeholder="SỐ Điện Thoại"
                            onChange={handleChange}
                        />
                    </div>

                    <div class="mb-3">
                        <label htmlFor="email" class="form-label">Email</label>
                        <input 
                            type="text" 
                            class="form-control"
                            name="email"
                            id="email"
                            placeholder="Email"
                            onChange={handleChange}
                        />
                    </div>

                    <div class="mb-3">
                        <label htmlFor="email" class="form-label">Giới tính</label>
                        <div class="form-check">
                            <input 
                            type="radio" 
                            class="form-check-input" 
                            name="gioitinh"
                            id="gioitinh"
                            value="Nam"
                            onChange={handleChange}
                            />

                            <label htmlFor="gioitinh" class="form-check-label">Nam</label>
                        </div>

                        <div class="form-check">
                            <input 
                            type="radio" 
                            class="form-check-input" 
                            name="gioitinh"
                            id="gioitinh"
                            value="Nữ"
                            onChange={handleChange}
                            />

                            <label htmlFor="gioitinh" class="form-check-label">Nữ</label>
                        </div>
                    </div>

                    
                </form>