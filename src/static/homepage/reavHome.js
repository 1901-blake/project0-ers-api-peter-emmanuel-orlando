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
                        middleArea.classList.remove("glow_pending");
                        middleArea.classList.add("glow_faliure");    
                        let func = ()=>{
                            passwordInput.disabled = false;
                            usernameInput.disabled = false;
                            usernameInput.focus();
                            usernameInput.select();
                            middleArea.classList.remove("glow_faliure");
                            middleArea.removeEventListener("animationend", func)
                        };           
                        middleArea.addEventListener("animationend", func);
                    }
                })
                //login.then(){if not logged in successfully, reinable input}
                console.log('tried to log in with')
                console.log(loginInfo);
            }          
            else
            {  
                let func = ()=>{
                    middleArea.classList.remove("glow_faliure");
                    middleArea.removeEventListener("animationend", func)
                };           
                middleArea.classList.add("glow_faliure");
                middleArea.addEventListener("animationend", func); 
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

            console.log('attempting to login');
            console.log(loginInfo);
            let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
            let serverRequest = { method: 'post', headers: headers, credentials: 'include', body: JSON.stringify(loginInfo) };
            let response = await fetch('http://localhost:3000/login', serverRequest).catch((e)=>{console.trace(); console.log(e)});
            if(response)
            {
                //console.log(response);
                if("json" in response)
                {
                    let responseJson = await response.json().catch((e)=>{console.trace(); console.log(e)})
                    console.log('got a response')
                    console.log(responseJson );
                }
                console.log('Redirecting to Reimbursement system')
                if(response.status >= 200 && response.status < 300)
                {
                    result = true;
                    window.location = "http://localhost:5500/src/static/reimbursement-management/reimbursementManagement.html";
                }
            }

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
