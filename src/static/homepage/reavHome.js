        let isLoggingIn = false;
        let usernameInput = document.getElementById('username-input');
        let passwordInput = document.getElementById('password-input');
        let middleArea = document.getElementById('middle-area');
        
        function attemptSubmit(event)
        {
            event.preventDefault();  
            let loginInfo = getLoginInfo();
            if(loginInfo)
            {
                //disable input
                usernameInput.disabled = true;
                passwordInput.disabled = true;
                middleArea.classList.add("glow_pending");
                login(loginInfo).then((success)=>{
                    if(!success){
                        usernameInput.disabled = false;
                        usernameInput.focus();
                        usernameInput.select();
                        middleArea.classList.remove("glow_pending");
                        middleArea.classList.add("glow_faliure");
                        timeout(2000).then(()=>{
                            middleArea.classList.remove("glow_faliure");
                        });

                        passwordInput.disabled = false;
                    }
                })
                //login.then(){if not logged in successfully, reinable input}
                console.log('tried to log in with')
                console.log(loginInfo);
            }          
            else
            {
                console.log('cannot login, provided info doesnt pass preliminary checks')
            }
        }

        function getLoginInfo()
        {
            let usernameInput = document.getElementById('username-input');
            let passwordInput = document.getElementById('password-input');

            let usernameVal = usernameInput && usernameInput.value;
            let passwordVal = passwordInput && passwordInput.value;
            // further preliminary checks to decrease server requests
            let result;
            if(usernameVal && passwordVal) 
                result = {"username" : usernameInput.value, "password" : passwordInput.value}
            //console.log(result);
            return result;
        }

        async function login(loginInfo)
        {
            isLoggingIn = true;
            let result = false
            await timeout(2000);
            isLoggingIn = false;
            return result;
        }

        async function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        /*
        let isLoginHappening = false;
        let isLoginQueued = false;
        function checkInput(event)
        {
            //console.log(`${inputId} changed its value. the new value is ${document.getElementById(inputId).value}`)
            let loginRequestInfo = getLoginInfo();
            if(loginRequestInfo )
            {
                if(!isLoginHappening)
                    login(loginRequestInfo);
                else if(!isLoginQueued)
                {
                    isLoginQueued = true;
                    setTimeout(() => {
                        isLoginQueued = false;
                        checkInput();  
                    }, .5);   
                }             
            }
        }

        function getLoginInfo()
        {
            let usernameInput = document.getElementById('username-input');
            let passwordInput = document.getElementById('password-input');

            let usernameVal = usernameInput && usernameInput.value;
            let passwordVal = passwordInput && passwordInput.value;
            // further preliminary checks to decrease server requests
            let result;
            if(usernameVal && passwordVal) 
                result = {"username" : usernameInput.value, "password" : passwordInput.value}
            //console.log(result);
            return result;
        }

        let isLoggedIn = false
        async function login(loginInfo)
        {
            if(!isLoggedIn)
            {
                isLoginHappening = true;
                let result = false
                
                // do fetch here
                console.log('tried to log in');
                console.log(loginInfo);
                await timeout(2000);

                isLoginHappening = false;
                isLoggedIn = result;
            }
        }

        async function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        */
