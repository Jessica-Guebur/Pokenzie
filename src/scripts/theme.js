export function handleDarkMode(){
    const darkModeButton = document.querySelector(`.header__theme-btn`);
    const html = document.querySelector('html');

    const darkMode = localStorage.getItem('@pokenzie:theme')
    
    if(darkMode){
        html.classList.add('dark-mode')
        darkModeButton.classList.add("header__theme-btn--sun")
    }

    darkModeButton.addEventListener(`click`, (event) =>{

        darkModeButton.classList.toggle("header__theme-btn--sun")

        html.classList.toggle('dark-mode');

        html.classList.contains('dark-mode')
        ?localStorage.setItem('@pokenzie:theme', 'dark')
        :localStorage.removeItem('@pokenzie:theme')


    });
}