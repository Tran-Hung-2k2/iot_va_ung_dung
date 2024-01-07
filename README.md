# Cách chạy project
# Tạo db 
Xem cấu hình db trong config/config.son và tạo db tương ứng trong mysql, sau đó chạy các lệnh sau tại thư mục gốc của dự án

npm run makemigrations

npm run migrate

npm run seed

# Đầu tiên thực hiện mở terminal tại folder gốc của project (blog_cnweb) và thực hiện các lệnh sau

npm run build

npm start

# Giữ nguyên terminal vừa chạy npm start và bật 1 terminal mới tại cùng thư mục gốc của dự án và chạy lệnh

npm run client

Hãy đảm bảo rằng máy của bạn không bận ở cổng 3000 (client) và 3001 (server)
