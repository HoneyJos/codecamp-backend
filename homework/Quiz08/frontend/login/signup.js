// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex';
  console.log('인증 번호 전송')
  const phone2 = document.getElementById("PhoneNumber02").value;
  const phone3 = document.getElementById("PhoneNumber03").value;
  const result = await axios.post("http://localhost:3000/tokens/phone", {
    phoneNumber: `010${phone2}${phone3}`
  });
}

// 회원 가입 API 요청
const submitSignup = async () => {
  console.log('회원 가입 이메일 전송');
  const phone2 = document.getElementById("PhoneNumber02").value;
  const phone3 = document.getElementById("PhoneNumber03").value;
  const data = {
    name: document.getElementById("SignupName").value,
    phoneNumber: `010${phone2}${phone3}`,
    prefer: document.getElementById("SignupPrefer").value,
    email: document.getElementById("SignupEmail").value
  }
  const result = await axios.post("http://localhost:3000/users", data)
}
