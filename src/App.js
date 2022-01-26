import './App.css';
import GoogleLogin from "react-google-login";

function App() {
    const handleLogin = async googleData => {
        console.log('token id', googleData.tokenId)
        // const formData = new FormData()
        // formData.append("code", googleData.tokenId)
        const res = await fetch("http://localhost:9090/login-iam", {
            method: "POST",
            body: JSON.stringify({ token: googleData.tokenId }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        console.log('data', data)
        // store returned user somehow
    }
  return (
    <div className="App">
      <GoogleLogin
          clientId="318116953955-d74bskibjt28mlpmansr1i9v11avacki.apps.googleusercontent.com"
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy={'single_host_origin'}

      />
    </div>
  );
}

export default App;
