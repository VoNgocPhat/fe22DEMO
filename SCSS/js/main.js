$(document).ready(function(){

    var nguoiDungService = new NguoiDungService();

    //Goi ham lay api
    getDanhSachNguoiDung();
    
    //Dom den nut them moi de mo popup
    $('#btnThemNguoiDung').click(function(){
        $('.modal-title').html('Thêm người dùng');

        var content = `
            <button id = 'btnThem' class = 'btn btn-success' data-toggle = 'modal' data-target = '#myModal'>Them</button>
            <button id = 'btnDong' class = 'btn btn-danger' data-dismiss = 'modal'>Dong</button>
        `;
        $('.modal-footer').html(content);
         
    })

    //Chuc nang them nguoi dung
    $('body').delegate('#btnThem', 'click', function(){
        var taiKhoan = $('#TaiKhoan').val();
        var hoTen = $('#HoTen').val();
        var matKhau = $('#MatKhau').val();
        var email = $('#Email').val();
        var soDT = $('#SoDT').val();
        var loaiNguoiDung = $('#loaiNguoiDung').val();

        var nguoiDung = new NguoiDung(taiKhoan,hoTen,matKhau,email,soDT,loaiNguoiDung);

        console.log(nguoiDung);
        
        nguoiDungService.themNguoiDung(nguoiDung);
        
    })

    //Nut sua nguoi dung
    $('body').delegate('.btnSua', 'click', function(){

        $('.modal-title').html('Sua nguoi dung')

        var content = `
            <button id = 'btnUpdate' class = 'btn btn-success' data-toggle = 'modal' data-target = '#myModal'>Sua</button>
            <button id = 'btnDong' class = 'btn btn-danger' data-dismiss = 'modal'>Dong</button>
        `;
        $('.modal-footer').html(content);

        var taiKhoan = $(this).data('taiKhoan');
        var nguoiDung = nguoiDungService.layThongTinNguoiDung(taiKhoan);

        console.log(nguoiDung);
        

        /**
            dom den 6 o input cap nhat lai du lieu tu bien nguoiDung
         */
    })

    //Chuc nang cap nhap nguoi dung
    $('body').delegate('#btnCapNhat', 'click', function(){
        /**
            Lay du lieu tu 6 o input
            Goi den phuong thuc cap nhat
         */
    })


    //Chuc nang xoa nguoi dung
    $('body').delegate('.btnXoa', 'click', function(){
        var taiKhoan = $(this).data('taiKhoan');
        nguoiDungService.xoaNguoiDung(taiKhoan);

    })

    //
    function getDanhSachNguoiDung(){

        //Lay ajax tu NguoiDungService
        nguoiDungService.layDanhSachNguoiDung()
        .done(function(data){
            localStorage.setItem('DSND', JSON.stringify(data));
            taoBang(data);
            console.log(data);
        })
        .fail(function(err){
            console.log(err)
        })
        ;
    }

    function taoBang(mang){
        var content = '';
    
        mang.map(function(item, index){
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.TaiKhoan}</td>
                    <td>${item.MatKhau}</td>
                    <td>${item.HoTen}</td>
                    <td>${item.SoDT}</td>
                    <td>${item.TenLoaiNguoiDung}</td>
                    <td>
                        <button data-taiKhoan = '${item.TaiKhoan}' class = 'btnSua btn btn-primary' data-toggle="modal" data-target="#myModal">Sua</button>
                        <button data-taiKhoan = '${item.TaiKhoan}' class = 'btnXoa btn btn-danger'>Xoa</button>
                    </td>
                </tr>
            `;
        });
        $('#tblDanhSachNguoiDung').html(content);
        
    }
})
