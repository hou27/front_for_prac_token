## Refresh Token

refresh token 공부를 위한 임시 frontend

2022.04.04.

interceptor를 통해 token 재발행 후 새로운 access token으로 request를 재요청까지 성공.  
그러나 이상하게도 해당 토큰이 만료되었다는 오류 발생. postman으로 같은 요청 보내보면 성공적인 결과 반환됨
