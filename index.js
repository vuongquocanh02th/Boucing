const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Các biến trò chơi
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2; // Tốc độ di chuyển theo chiều X
let dy = -2; // Tốc độ di chuyển theo chiều Y
const barHeight = 10;
const barWidth = 100;
let barX = (canvas.width - barWidth) / 2;

// Điều khiển thanh đỡ
let rightPressed = false;
let leftPressed = false;

// Lắng nghe sự kiện bàn phím
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

// Vẽ quả bóng
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

// Vẽ thanh đỡ
function drawBar() {
    ctx.beginPath();
    ctx.rect(barX, canvas.height - barHeight, barWidth, barHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

// Vòng lặp trò chơi
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBar();

    // Kiểm tra va chạm với viền
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx; // Đảo chiều di chuyển theo X
    }
    if (y + dy < ballRadius) {
        dy = -dy; // Đảo chiều di chuyển theo Y
    } else if (y + dy > canvas.height - ballRadius) {
        // Kiểm tra va chạm với thanh đỡ
        if (x > barX && x < barX + barWidth) {
            dy = -dy; // Đổi hướng khi hứng được bóng
        } else {
            alert("Game Over!"); // Kết thúc trò chơi
            document.location.reload(); // Tải lại trang
        }
    }

    // Cập nhật vị trí của bóng
    x += dx;
    y += dy;

    // Điều khiển thanh đỡ
    if (rightPressed && barX < canvas.width - barWidth) {
        barX += 7; // Di chuyển thanh sang phải
    } else if (leftPressed && barX > 0) {
        barX -= 7; // Di chuyển thanh sang trái
    }

    requestAnimationFrame(draw); // Vòng lặp liên tục
}

// Bắt đầu trò chơi
draw();
