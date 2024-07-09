1. SetUp

   - 폴더 생성 후 깃 연결 init -y
   - gitignore , readme 생성
   - 아폴로, 노디몬 라이브러리 생성
   - 아폴로 서버 구축
   - 노드가 버전이 낮아도 웹에서 사용 할 수 있는 언어로 변경 할 수 있는 것은 babel이다. babel 라이브러리를 사용하면 모두 같은 조건으로 변경해서 만듬
   - 스크립트에서 보면 노드데몬은 바벨을 통해 서버를 실행하는 것으로 된다.

2. db

   - client는 데이터베이스와 어떻게 말하는 건가? 임
   - client는 node_moudeles에 있음

3. hash

   - npm i bcrypt

4. prisma (async, await, promise)

   - 비동기 : 끝날 때 까지 기다리지 않고 다음 코드를 실행한다. 순차적으로 사용 하려고 하면 콜백함수를 써야하는데 코드가 복잡해지고 에러 처리가 어렵다.
   - promise : 비동기 함수의 결과를 담고있는 객체이고 총 3가지(대기,성공,실패) -> 대기상태에서 상태가 바뀌면 then(), catch() 함수를 사용해서 성공의 프로미스 실패 프로미스를 처리 할 수 있다.
   - async : 이 함수는 비동기 함수이고 프로미스를 반환한다.
   - await : 상태가 바뀌면 다음 코드를 실행한다. (그 전까지는 다음 코드 실행 x)

5. jsonwebtoken
   - npm install jsonwebtoken

# Instagram backend

Instaclone Backend.

## Instaclone

Instaclone Backend.

## User:

- [x] Create Account
- [x] See Profile
- [x] Login
- [x] Edit Profile
- [x] Change Avatar (Image Upload)
- [x] Follow User
- [x] Unfollow User
- [x] See Followers w/ Pagination
- [x] See Following w/ Pagination
- [x] Computed Fields
- [x] Search Users

## Photos

- [ ] Upload Photo (Parse #)
- [ ] See Photo
- [ ] See Hashtags
- [ ] Search Photos
- [ ] Edit Photo
- [ ] Like / Unlike Photo
- [ ] See Photo Likes
- [ ] See Feed

## Comments

- [ ] Comment on Photo
- [ ] Edit Comment
- [ ] Delete Comment
