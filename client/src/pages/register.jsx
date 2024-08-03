import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.css';
const Register = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [qrCode, setQrCode] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // Step 1: Registration, Step 2: OTP Setup
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL || '/api';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            const data = await response.json();
            console.log('Registration successful', data);
            // Proceed to 2FA setup
            await setup2FA(data.email);
            setStep(2);
        } catch (error) {
            setError(error.message);
        }
    };

    const setup2FA = async (email) => {

        const response = await fetch(`${apiUrl}/users/setup-2fa`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email }),
        });

        if (response.ok) {
            const data = await response.json();
            setQrCode(data.imageUrl);
        } else {
            setError('Failed to generate QR code');
        }
    };

    const verify2FASetup = async () => {
        const response = await fetch(`${apiUrl}/users/verify-2fa-setup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: form.email, token: otp }),
        });

        if (response.ok) {
            setError('2FA setup is complete. You can now log in.');
            navigate('/login');
        } else {
            setError('Invalid OTP');
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Register</h1>
            {error && <p className="text-danger">{error}</p>}
            {step === 1 && (
                <form onSubmit={handleSubmit}>
                    <div className="registerContainer container">
      <h1 className="registerHeader">Register</h1>
      <form>
        <input className="registerInput" type="text" placeholder="Username" />
        <input className="registerInput" type="email" placeholder="Email" />
        <input className="registerInput" type="password" placeholder="Password" />
        <button className="registerButton" type="submit">Register</button>
      </form>
    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            )}
            {step === 2 && (
                <div>
                    {qrCode && <img src={qrCode} alt="QR Code" />}
                    <div className="form-group">
                        <label htmlFor="otp">OTP</label>
                        <input
                            type="text"
                            className="form-control"
                            id="otp"
                            name="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <button onClick={verify2FASetup} className="btn btn-primary">Verify OTP</button>
                </div>
            )}
        </div>
    );
};

export default Register;