function changeColorMenu() {
    const header = document.querySelector('.header') //Lấy phần tử header
    document.addEventListener('scroll', function () {
        let scrollY = window.pageYOffset //Lấy chiều cao đã scroll trong cửa sổ trình duyệt
        if (scrollY > 500 / 3) { //Nếu scroll tới vị trí dưới phân nửa của slider
            header.classList.add('show') // Thêm class show vào header
        }
        else { // Nếu scroll đến vị trí trên nửa slider
            header.classList.remove('show') //Thu hồi class show trong header
        }
    })
}
changeColorMenu();

//Progess bar 
function loadProgress() {
    let bar = document.querySelector('.progress-bar')
    window.addEventListener('scroll', function () {
        let scrollY = window.pageYOffset;
        let pageHeight = document.body.clientHeight;
        let viewHeight = window.innerHeight;
        let percent = (scrollY / (pageHeight - viewHeight)) * 100;
        bar.style.width = `${percent}%`;
    })
}
document.addEventListener('load', loadProgress())

// Remove class active in menu
function removeActiveMenu() {
    let menus = document.querySelectorAll('.header .header__right-menu .item .item__link') //Lấy các phần tử trong menu
    menus.forEach(element => { //chạy vòng lặp
        element.classList.remove('active'); //Thu hồi class active với tất cả phần tử
    });
}

// Click scroll to menu 
function scrollMenu() {
    let sections = [] //Mảng tạm chứa các section
    let menus = document.querySelectorAll('.header .header__right-menu .item .item__link') //Lấy các phần tử trong menu
    const header = document.querySelector('.header') //Lấy phần tử header
    menus.forEach(element => {//chạy vòng lặp
        let className = element.getAttribute('href').replace('#', ''); //Lấy thuộc tính href có trong thẻ a vd: #slider, #about gán cho biến className
        let section = document.querySelector('.' + className); //Lấy tất cả section có className vừa lấy
        sections.push(section); //Đẩy các section trong vòng lặp vào mảng tạm

        element.addEventListener('click', function (e) { //Nghe sự kiện click vào thẻ a 
            e.preventDefault(); //Ngăn chuyển trang
            window.scrollTo({ //Scroll cửa sổ trình duyệt tới vị trí top = top của section trừ cho chiều cao của header
                top: section.offsetTop - header.offsetHeight,
                behavior: 'smooth'
            })
            removeActiveMenu(); //Gọi hàm xóa class active menu 
            this.classList.add('active'); //Thêm class active vào thẻ a vừa click
        })
    });

    window.addEventListener('scroll', function () { //Lằng nghe sự kiện scroll của cửa sổ trình duyệt 
        let scrollY = window.pageYOffset; //Gán chiều cao của cửa sổ trình duyệt cho biến scrollY
        const header = document.querySelector('.header') //Lấy phần tử header
        sections.forEach(function (element, index) { //chạy vòng lặp
            let height = element.offsetTop - header.offsetHeight - 10;  //Lấy chiều cao tối đa của một section trừ header trừ hao 10px
            if (scrollY > height) { //Nếu scroll tới vị trí lớn hơn chiều cao tối đa
                removeActiveMenu(); // Xóa class active
                menus[index].classList.add('active') // Thêm class active vào thẻ a
            }
        })
    })
}
scrollMenu();

// function scrollToGame() {
//     let playbtn = document.querySelector('.play__btn')
//     playbtn.addEventListener('click',function (e) { //Nghe sự kiện click vào thẻ a 
//             e.preventDefault(); //Ngăn chuyển trang
//             window.scrollTo({ //Scroll cửa sổ trình duyệt tới vị trí top = top của section trừ cho chiều cao của header
//                 top: section.offsetTop - header.offsetHeight,
//                 behavior: 'smooth'
//             })
//             removeActiveMenu(); //Gọi hàm xóa class active menu 
//             this.classList.add('active'); //Thêm class active vào thẻ a vừa click
//     )
// }

scrollToGame();

function accordionShow() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
}
accordionShow();

function closeVideo() {
    const player = document.querySelector('.popupvideo__inner-iframe iframe')
    player.setAttribute('src', ``)
}

// Videos list 
function handleClickPlay() {
    let URL = "https://www.youtube.com/embed/6GDBMpGgqTM";
    let modal = document.querySelector('.popupvideo')
    let close = document.querySelector('.btnclose')
    let play = document.querySelector('.playicon')
    let watch = document.querySelector('.watch-btn')
    const player = document.querySelector('.popupvideo__inner-iframe iframe')
    play.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        player.setAttribute('src', `${URL}?autoplay=1`)
        modal.classList.add('active');
    })
        watch.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        player.setAttribute('src', `${URL}?autoplay=1`)
        modal.classList.add('active');
    })
    close.addEventListener('click', function () {
        modal.classList.remove('active')
        closeVideo();
    })

    document.addEventListener('click', function (e) {
        modal.classList.remove('active')
        closeVideo();
    })
}

handleClickPlay();
