document.addEventListener('DOMContentLoaded', function() {
    const requestOtpBtn = document.getElementById('requestOtpBtn');
    const verifyOtpBtn = document.getElementById('verifyOtpBtn');
    const requestOtpSection = document.getElementById('requestOtpSection');
    const verifyOtpSection = document.getElementById('verifyOtpSection');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const otpInput = document.getElementById('otp');
    const statusMessage = document.getElementById('statusMessage');

    // Handle Request OTP Button Click
    requestOtpBtn.addEventListener('click', function() {
        const phoneNumber = phoneNumberInput.value;
        if (phoneNumber) {
            // In a real application, you would send this phone number to your backend
            // to generate and send an OTP.
            console.log('Requesting OTP for phone number:', phoneNumber);
            
            // Show a success message and then switch to OTP verification section
            showStatusMessage('OTP has been sent to your phone number.', 'text-green-600');
            setTimeout(() => {
                requestOtpSection.classList.add('hidden');
                verifyOtpSection.classList.remove('hidden');
            }, 2000);
        } else {
            showStatusMessage('Please enter a valid phone number.', 'text-red-600');
        }
    });

    // Handle Verify OTP Button Click
    verifyOtpBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const otp = otpInput.value;
        if (otp) {
            // In a real application, you would send this OTP to your backend
            // for verification.
            console.log('Verifying OTP:', otp);
            
            // Here we'll simulate a successful verification
            // In a real app, this would be based on the backend's response
            showStatusMessage('OTP Verified successfully!', 'text-green-600');
            
            // Reset the form after successful verification
            setTimeout(() => {
                requestOtpSection.classList.remove('hidden');
                verifyOtpSection.classList.add('hidden');
                document.getElementById('otpForm').reset();
                hideStatusMessage();
            }, 3000);
        } else {
            showStatusMessage('Please enter the OTP.', 'text-red-600');
        }
    });

    function showStatusMessage(message, colorClass) {
        statusMessage.textContent = message;
        statusMessage.className = `text-center text-sm font-medium transition-opacity duration-300 ${colorClass}`;
        statusMessage.classList.remove('opacity-0');
        statusMessage.classList.add('opacity-100');
    }

    function hideStatusMessage() {
        statusMessage.classList.remove('opacity-100');
        statusMessage.classList.add('opacity-0');
    }
});
