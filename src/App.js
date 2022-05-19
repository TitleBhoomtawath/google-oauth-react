import './App.css';
import GoogleLogin from "react-google-login";
import {useState} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard/src";

function App() {
    const [accessToken, setAccessToken] = useState("")
    const [copied, setCopied] = useState(false)
    const handleLogin = async googleData => {
        setCopied(false)
        console.log('token id', googleData.tokenId)
        if (googleData.tokenId) {
            const res = await fetch("http://localhost:9090/login-iam", {
                method: "POST",
                body: JSON.stringify({token: googleData.tokenId}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            console.log('data', data)
            setAccessToken(data.access_token)
            // store returned user somehow
        } else {
            console.error('token id is invalid')
        }
    }
  return (
    <div className="App">
        <div>
          <GoogleLogin
              clientId="318116953955-d74bskibjt28mlpmansr1i9v11avacki.apps.googleusercontent.com"
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleLogin}
              cookiePolicy={'single_host_origin'}
          />
        </div>
        <div>
            <label htmlFor="access_token">Access Token:</label>
            <textarea id="access_token" disabled={true} value={accessToken}/>
            <CopyToClipboard text={accessToken} onCopy={() => setCopied(true)}>
                <button disabled={copied}>Copy</button>
            </CopyToClipboard>
        </div>
    </div>
  );
}

export default App;
