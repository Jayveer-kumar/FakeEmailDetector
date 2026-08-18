import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from "react";
import ResultBox from './ResponseAnimation';
import CustomAlert from '../Components/Aleart';
import { validateEmail } from '../Utills/valiDateEmail';

import "./Hero.css";

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

export default function Home() {
  const [email, setEmail] = useState("");
  const [jsonMode, setJsonMode] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [testedEmail, setTestedEmail] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");

  const statusFromResult = (data) => {
    // adjust this mapping to match your backend's actual response shape
    if (!data) return null;
    if (data.isValid === true) return "valid";
    if (data.isValid === false) return "invalid";
    return "risky";
  };

  const handleEmailTestButtonClick = async () => {
    if (!email.trim()) {
      setAlertMsg("Please enter an email first");
      setAlertType("error");
      setAlertOpen(true);
      return;
    }

    if (!validateEmail(email)) {
      setAlertMsg("Invalid Email Format!");
      setAlertType("error");
      setAlertOpen(true);
      return;
    }

    setLoading(true);
    const data = await getResponseFromServer(email);
    setLoading(false);

    if (!data) {
      setAlertMsg("Something went wrong. Please try again.");
      setAlertType("error");
      setAlertOpen(true);
      return;
    }

    setTestedEmail(email);
    setEmail("");
    setShowOutput(true);
  };

  const getResponseFromServer = async (email) => {
    try {
      const res = await fetch('http://localhost:8080/user/email/check', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setResult(data);
      return data;
    } catch (err) {
      console.error("Error fetching email verification data: ", err);
      return null;
    }
  };

  const handleHideOutputWindowButtonClick = () => {
    setShowOutput(false);
  };

  const status = statusFromResult(result);

  return (
    <div className="Hero">
      <div className="heroLeft">
        <h1 className="text-semibold">Fake Email Detector</h1>
        <p>
          Verify the authenticity of any email address in real-time with our
          advanced Fake Email Detector. Ensure your communications reach
          genuine recipients and protect your business from fraudulent
          activities.
        </p>
        <div className="trustRow">
          <span>✓ Real-time check</span>
          <span>✓ No signup</span>
          <span>✓ MX & disposable detection</span>
        </div>
      </div>

      <div className="heroRight">
        <div className="cardStack">
          <div className={`inputwindow ${showOutput ? "hide" : ""}`}>
            <input
              type="text"
              name="email"
              id="emailinput"
              placeholder="Enter email to test..."
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEmailTestButtonClick()}
            />
            <p className="helperText">We'll check MX records & disposable domains</p>
            <button
              type="button"
              id="testButton"
              onClick={handleEmailTestButtonClick}
              disabled={loading}
              className="flex gap-1"
            >
              {loading ? (
                <>
                  <span className="spinner" /> Checking...
                </>
              ) : (
                <>
                  Test <SendIcon className="ml-2" fontSize="small" />
                </>
              )}
            </button>
            <CustomAlert
              open={alertOpen}
              onClose={() => setAlertOpen(false)}
              message={alertMsg}
              severity={alertType}
            />
          </div>
          

          <div className={`outputWindow ${showOutput ? "show" : "hide"}`}>
            <div className="outputhead">
              <h3>
                Result for <i id="emailDisplay">{testedEmail}</i>
              </h3>
              <button id="hideOutputWindow" onClick={handleHideOutputWindowButtonClick}>
                <CloseIcon />
              </button>
            </div>

            {status && (
              <span className={`statusBadge ${status}`}>
                {status === "valid" && "Valid Email"}
                {status === "invalid" && "Invalid Email"}
                {status === "risky" && "Risky / Uncertain"}
              </span>
            )}

            <div className="someQuickAction flex justify-end items-center">
              <FormControlLabel
                control={
                  <PinkSwitch
                    checked={jsonMode}
                    onChange={() => setJsonMode((prev) => !prev)}
                  />
                }
                label="JSON View"
                labelPlacement="start"
                sx={{ color: "white", userSelect: "none" }}
              />
            </div>

            <div className="serverResponse">
              <ResultBox result={result} mode={jsonMode ? "json" : "message"} />
            </div>
          </div>
          <p className="disclaimerText">Email Checker can make mistakes. Verify important addresses.</p>
        </div>
      </div>
    </div>
  );
}