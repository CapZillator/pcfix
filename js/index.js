const toggleOrderCall = () => {
    const wrapper = document.querySelector('.OrderCallWrapper').classList;
    wrapper.toggle('OrderCallWrapperHide');
    const block = document.querySelector('.OrderCallBlock').classList;
    block.toggle('OrderCallBlockHide');
}
const toggleSideMenu = () => {
    const menu = document.querySelector('.SideMenu').classList;
    menu.toggle('SideMenuHide');
}
const isOnVisibleSpace = (element) => {
	const bodyHeight = window.innerHeight;
    const elemRect = element.getBoundingClientRect();
    const offset = elemRect.top + document.querySelector('.HeaderMenu').offsetHeight;
    if (offset < 0 || offset > bodyHeight) return false;
    else return true;
}
const scrollToElement = (element) => {
    const topOffset = document.querySelector('.HeaderMenu').offsetHeight;
    window.scrollBy({
        top: document.querySelector(element).getBoundingClientRect().top - topOffset,
        behavior: 'smooth'
    });
}
const checkName = (name) => {
    let resultName = name.trim();
    if (resultName.length > 1) return resultName;
    else return false;
}
const checkPhone = (phone) => {
    let resultPhone = phone.trim();
    resultPhone = resultPhone.replace(/\s+|_+|-+|\+/g, "");
    if (resultPhone.length > 8) return resultPhone;
    else return false;
}

document.addEventListener('DOMContentLoaded', () => {
    let screenFlags = [{'servicies': false}, {'advantages': false}, 
        {'circles': [false, false, false, false]}];//Флаги, показывалась ли анимация в соответствующих блоках
    let callIsOrdered = false;//Флаг, заказывал ли пользователь звонок
    const secondScreen = document.querySelector('.ServiciesBlock');
    const thirdScreen = document.querySelector('.AdvantagesBlock');
    const callMe = document.querySelectorAll('.CallMe');
    callMe.forEach((c) => {
        c.addEventListener('click', () => {
            toggleOrderCall();
        });
    });
    const scrollToServicies = document.querySelectorAll('.ScrollToServicies');
    const scrollToAdvantages = document.querySelectorAll('.ScrollToAdvantages');
    const scrollToDiscount = document.querySelectorAll('.ScrollToDiscount');
    const scrollToTop = document.querySelector('.HeaderLogo');
    scrollToServicies.forEach((s) => {
        s.addEventListener('click', () => {
            scrollToElement('.SecondScreen');
        });
    });
    scrollToAdvantages.forEach((s) => {
        s.addEventListener('click', () => {
            scrollToElement('.ThirdScreen');
        });
    });
    scrollToDiscount.forEach((s) => {
        s.addEventListener('click', () => {
            scrollToElement('.FourthScreen');
        });
    });
    scrollToTop.addEventListener('click', () => {
        scrollToElement('.FirstScreen');
    });
    document.querySelector('.OrderCallWrapper').addEventListener('click', (e) => {
        const block = document.querySelector('.OrderCallBlock');
        if (!block.contains(e.target)) toggleOrderCall();
    });
    document.querySelector('.MenuButton').addEventListener('click', () => {
        toggleSideMenu();
    });
    document.addEventListener('click', function(e) {
        const menu = document.querySelector('.SideMenu');
        const menuButton = document.querySelector('.MenuButton');
        const flag = menu.classList.contains('SideMenuHide');
        if (!menu.contains(e.target) && !menuButton.contains(e.target) && !flag) menu.classList.toggle('SideMenuHide');
    });
    document.querySelector('#FullListButton').addEventListener('click', () => {
        document.querySelector('.FullListOfServicies').classList.toggle('FullListOfServiciesHide');
        document.querySelector('.ListArrow').classList.toggle('ListArrowRotate');
    });
    document.querySelector('#ConfirmCall').addEventListener('click', () => {//Обрабатываем клик по кнопке заказа звонка
        if (!callIsOrdered) {
            const name = checkName(document.querySelector('#UserName').value);
            const phone = checkPhone(document.querySelector('#UserPhone').value);
            let resultText = "Укажите свои данные!";
            if (name && phone) {
                callIsOrdered = true;
                resultText = "Ожидайте звонка!";
            }
            document.querySelector('.OrderCallHeader').textContent = resultText;
        };
    });
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            const headerMenu = document.querySelector('.HeaderMenu');
            if (!headerMenu.classList.contains('HeaderMenuScroll')) headerMenu.classList.add('HeaderMenuScroll');
        }
        else {
            const headerMenu = document.querySelector('.HeaderMenu');
            if (headerMenu.classList.contains('HeaderMenuScroll')) headerMenu.classList.remove('HeaderMenuScroll');
        };
        if (isOnVisibleSpace(secondScreen)){
            if (!screenFlags[0].servicies){
                screenFlags[0].servicies = true;
                document.querySelector('.ScrollIndicator').classList.toggle('ScrollIndicatorHide');
                document.querySelector('.ServiceHeader').classList.toggle('ServiceHeaderMotion');
                document.querySelectorAll('.SingleService').forEach((s, i) => {
                    setTimeout(() => s.classList.toggle('SingleServiceMotion'), i * 250);
                });
            } 
        };
        if (isOnVisibleSpace(thirdScreen)){
            if (!screenFlags[1].advantages){
                screenFlags[1].advantages = true;
                document.querySelectorAll('.SingleAdvantage').forEach((s, i) => {
                    setTimeout(() => s.classList.toggle('SingleAdvantageMotion'), i * 250);
                });
            } 
        };
        if (isOnVisibleSpace(document.querySelector('#ExpAge'))){
            if (!screenFlags[2].circles[0]){
                screenFlags[2].circles[0] = true;
                document.querySelector('#ExpAge .BarCircle').classList.add('BarCirclePercentage');
            } 
        };
        if (isOnVisibleSpace(document.querySelector('#ExpPercentage'))){
            if (!screenFlags[2].circles[1]){
                screenFlags[2].circles[1] = true;
                document.querySelector('#ExpPercentage .BarCircle').classList.add('BarCirclePercentage');
            } 
        };
        if (isOnVisibleSpace(document.querySelector('#ExpAgain'))){
            if (!screenFlags[2].circles[2]){
                screenFlags[2].circles[2] = true;
                document.querySelector('#ExpAgain .BarCircle').classList.add('BarCircleAgain');
            } 
        };
        if (isOnVisibleSpace(document.querySelector('#ExpTime'))){
            if (!screenFlags[2].circles[3]){
                screenFlags[2].circles[3] = true;
                document.querySelector('#ExpTime .BarCircle').classList.add('BarCircleTime');
            } 
        };
    });

});