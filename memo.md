<pre style="white-space: pre-wrap;">
  <code>
개발 다이어리
----------------------------------------------------------
-------------2024-5-13 ~ 2024-6-9  -> 1차 개발-------------
----------------------------------------------------------


-------------------------------개발 사항-------------------------
DB - User(사용자), Accomodation(숙소),  
                        Evaluation(평가), Reservaition(예약),
                        Search(검색어) 초기 DB 모델 설계
백엔드 - User(사용자)모델 로그인, 회원 가입, 정보 수정
                        Accomodation(숙소)모델 등록
                        Evaluation(평가)모델 등록
                        Reservation(예약)모델 등록 기능
                        Search(검색)모델 등록순으로 DB등록
프론트엔드 - 전체 페이지 기본 레이아웃 1차 완성,
                        메인페이지 카테고리별 분류, 서브페이지 검색어         
                        별 필터링하여 화면출력
                        서버로 보내는 데이터 1차 가공



-------------------------------보완 사항-------------------------
프론트엔드
1 - 백엔드로 보내는 데이터 1차 유효성 검증이 대부분 안되어 있기 때문에 데이터 검증 추가하기
2 - 숙소 상세 페이지 호스트/게스트 다르게 표시하기
3 - 내가 쓴 댓글 목록 보기/수정/삭제
4 - 상세페이지 스크롤 밑으로 이동 시 각 section으로 스크롤 이동하는 메뉴(fixed) 만들기
5 - 숙소 서브 페이지(지역별 분류) 페이지 밑으로 이동 시 사이드 메뉴(필터) position fixed로 화면에 따라오게 만들기
6 - 예약정보 상세보기 페이지 만들기
7 - 데이터 패치 성공 시 프론트쪽 state나, input에 저장되어 있는 값 초기화하는 작업
8 - 호스트 숙소 등록 클릭 시 데이터 수정 페이지 / 숙소 규칙 수정 페이지
9 - 서브 페이지 지도 클릭 시 지도 호버 시 정보 뜨는 모달창

백엔드
1 - 숙소 구입 신청 시 호스트가 수락 시 결제 완료되게 만들기
2 - 숙소 업데이트 & 삭제 기능
3 - 호스트가 숙소 대여 불가능한 날짜 지정할 수 있게 하는 기능 & 날짜 별로 검색 기능 필터링
4 - 유저 프로필 사진 변경, 찜하기, 호스트 첫 등록 날짜 생성, 회원탈퇴 기능
5 - 메인페이지 및 서브페이지에 쓸 데이터 보낼 때 최신순 or 조건에 따라서 sort하여 보내기
6 - 할인 db추가하기
7 - 검색어 db 추가할 사항 없는지 체크




----------------------------------------------------------
------------------2024-7-30 -> 2차 개발-------------------
----------------------------------------------------------

7.30 
- 메인(렌딩)페이지 폰트 및 레이아웃 세부 조정 /  img 파스텔 톤으로 변경 / 검색 메뉴 레이아웃 및 디자인 세부 조정 / 렌딩 페이지 이미지 변경

7.31 
- 전체 데이터량이 많아졌을 때를 대비해서/ 메인페이지 전체 데이터 패치 후 프론트에서 분류하는 로직 -> promise.all로 병렬 패치 후 백엔드에서 분류해서 프론트에 필요한 만큼만 잘라서 패치하는   
  로직으로 변경
- 슬라이더 버튼 로직 간소화 / 버튼 레이아웃 미세 변경
- 목록 버튼 클릭 시 해당 컴포넌트만 리랜더링 하여 필터링하는 섹션 추가

8.1
- 메인페이지 섹션별 슬라이드 커스텀 -> 스와이퍼로 로직 변경 / 드래그 이벤트 추가 / 에니메이션 로직 및 코드 단순화
- 슬라이드 드래그 or 버튼 클릭으로 이동 후 start, end 지점 도착 시 버튼 display : none or block 제어 
- 검색기능 스크롤 내릴 시 화면에 fixed시켜서 메뉴에서 제어 가능하도록 변경
- view, business hook으로 기능/스타일 로직 분리하여 커스텀훅으로 임포트 하는 방식으로 구조 변경

*********메모사항 - 커스텀 훅 중첩 사용 시 주의사항 및 방향성**********
1. 조건문 반복문에서 훅 호출x(*****주의*****useEffect 안에서 쓰지 말 것)
2. 훅의 호출 순서 동일(if문안에서 훅 호출하면 훅 호출 순서 꼬일 수 있음)
3. 커스텀 훅은 최상위 레벨 훅에서 모두 임포트 하여 컴포넌트에 디포트해서 사용할 것
4. 훅들의 스테이트값 변경으로 인한 리랜더링은 훅을 호출한 최상위 컴포넌트에서 일어나는걸 활용해서 코드 구조화 시킬 것

8.3
- 기존에 훅 안에서 스테이트, ref정의 후 훅을 사용하는 최상위 컴포넌트에서 임포트 하는 방식은 스테이트, ref관리가 힘든 느낌이 들어서 => 최상위 컴포넌트에서 state, ref정의 후 훅쪽으로 파라미터로 내려주는
  로직으로 변경
  파라미터로 스테이트, ref 내려줄 때 함수 파라미터 입력 시 가시성 + 타입검사(객체,배열인지)을 위해서 
    ...example...
    state_store([
        {
            'selectedDropdown':selectedDropdown,
            'setSelectedDropdown':setSelectedDropdown
        },
        {
            'cityName':cityName,
            'setCityName':setCityName
        }
    ]),
    reference_store([
        {'b_box1_ref':b_box1_ref}, 
        {'b_box3_ref':b_box3_ref}, 
        {'b_box3_ref_box3':b_box3_ref_box3}, 
        {'b_box3_ref_val':b_box3_ref_val}
    ])
  의 형태로 배열안에 객체 형태로 넣어서 넣은 값은 객체 형태로 보관(utilFunction에 공통 함수로 저장 함수 정의) / 
  배열과 객체는 참조값이 동일하며, state의 문자열같은 원시타입은 스테이트 변경 시 리랜더링 되는 원리로 인해 최상위 컴포넌트에서 커스텀 훅 호출 시 최신 상태의 ref, 스테이트를 커스텀 훅에서 사용 가능 / 
  스테이트 , ref 보관하는 함수의 라이프사이클 = 최상위 컴포넌트의 라이프사이클 
  
  ********* 컴포넌트 안에서 사용하는 state, ref는 정의해 둔 공통 함수의 store로 관리 => 훅을 사용하는 최상위 컴포넌트의 라이프 사이클과 동일(전역 상태 x)
  ********* 다른 컴포넌트에서도 사용(전역 상태 o)하여 라이프사이클을 조정할 필요가 있는 state => redux & session storage로 관리

8.4
- 모달창 클릭 시 뒷배경 어둡게 만드는 overay생성 시 position:fixed 속성 줄 때 부모 요소에 filter,transform과 같은 속성 들어가 있을 시
  position:fixed의 기준점이 최상위 뷰포트가 아닌 부모요소의 포지션을 기준으로 움직임 -> 

  하나의 overay로 모든 모달/드랍다운에 사용하기 위해서 리덕스 툴킷으로 상태관리 및 드롭다운/모달창 열닫기 제어하는 방식으로 변경
  overay 컴포넌트 레이아웃 위치는 최상위 컴포넌트 app.js에서 호출 해서 position:fixed 제대로 들어가게 하기
  
8.5
- 서브페이지 전체 데이터 패치 후 프론트에서 필터링 하는 로직에서 -> 페이지 네이션 한 페이지에 들어가는 list만큼만 패치하는 방식으로 변경
- 서브페이지 세부 레이아웃 폰트크기 조정 / 페이지네이션 프론트에서 로직처리 -> mongoDB skip, limit이용해서 백엔드에서 로직 처리
- 백엔드 서브페이지 페이지네이션, 중복필터 db쿼리문 처리하는 api 따로 분리

8.6
- 불변성을 유지해야 하는 데이터(페이지 새로고침이나 페이지 이동 시에도 유지 되어야 하는 스테이트)는 어떻게 관리할 지? ex.(검색어 데이터) redux state로 1차 저장 / session storage에 2차 저장 
  페이지 새로고침 시 redux초기화 되므로 불변성이 보장되야 되는 데이터 사용 시 if문으로 -> 1차 redux state 사용 -> null값 일 시 -> 2차 session storage 사용 -> null값 일 시 -> api 요청 후 데이터 패치
  로 서버 fetch 최소화 시키기
- 내가 어떤 데이터 저장했나 확인할 때 session storage의 key값 조회나 parse, stringify과정 매우 귀찮으므로 class로 따로 만들어서 new class를 임포트하는(싱글톤 패턴) 하나의 클래스 인스턴트로
  전역 불변 데이터 관리하기
- 분류 조건에 sort추가해서 백엔드 로직추가 sort항목(날짜순,가격순,리뷰많은순,평점순)

8.7
- 기존에 find로 숙소 모델 찾는 db문에서 -> aggregate로 파이프 라인 만들어서 평가 컬렉션과 조인 후 평균 평점 & 평가 인원 집계 후 클라이언트로 전송하는 db쿼리문으로 변경
- 평가 컬렉션 안에 평점의 데이터 구조 -> 
  _id:...,
  text:...,
  evaluation:[
    {
      name:checkin,
      title:'청결도,
      grade:4
    },
    {
      name:location,
      title:'위치,
      grade:5
    },
    {
      name:avgGrade,
      title:'전체 평점,
      grade:4.5
    },
    ............
  ]
  으로 되있는 거를 기존에 $unwind로 펼처서 평균 집계하는 방식에서 $map, $filter로 평균 집계하는 방식으로 변경 

  unwind - 배열 필드를 분해하여 각 배열 요소마다 개별 문서를 생성하는 메서드 // addfiled로 파이프라인 만드는건 문서 내에서 새로운 필드 추가하는 메서드

  
  filter, map으로 파이프라인 구성하는 것
- 장점
  메모리 사용량 상대적으로 적음 / 복잡한 배열구조 다룰 때 유용
  *** $unwind는 각 배열 요소를 개별 문서로 처리하여 문서 수를 증가시키기 때문에 메모리 사용량과 CPU 사용량이 증가할 수 있다 ***
  작은 데이터 셋에서는 더 직관적인 unwind사용할 것
  
- 단점
  직관성 떨어짐 -> 파이프라인 폴더만들어서 각각의 파이프라인 따로 관리하고 import해서 사용

  ********* DB 파이프라인 설계 시 접두사 사용규칙 *********
  $: $ 접두사는 필드 이름을 참조하는 데 사용 / addfiled로 필드 만들 고 다음 파이프라인에서 사용할 때 $로 들어갈 것
  $$: $$ 접두사는 변수를 참조하는 데 사용 / 파이프라인 안에서 input으로 필드 참조하고 as로 변수정의한 후 in이나 cond안에서 변수를 끌어다 쓸때는 $가 아닌 $$로 들어갈 것(중요!!! 존나고생함ㅜ)

8.9
- price버튼 기존 input type=range에서 커스텀으로 자체 로직 구현(예쁘게 꾸미기 위해서;) / 버튼 범위 2개로 양방향 범위 조절 / 각 버튼이 버튼을 넘어가지 않도록 제한 / 
  마우스 드래그 & 클릭 이벤트로 가격 조절 가능
  드래그 이벤트 속에서 렌더링 최적화 하기 위해 마우스 up시에 렌더링 2번으로 최소화(쿼리스트링 바뀌는 렌더링 1, 데이터 패치 후 리덕스로 관리하는 data 변경 후 렌더링 2)
  마우스 드래그 이벤트 안에서는 ref, html의 dataset요소로 변수 관리 후 mouseup시에만 스테이트 변경하여 화면 렌더링
  마우스 드래그 , 마우스 업 이벤트는 document에 등록 후 전역에 발생하며 target 박스 범위 넘어가도 에니메이션이 끊기지 않도록 구현
  전역 이벤트는 useEffect에서 return으로 컴포넌트가 언마운트 됬을 시 이벤트 삭제하여 pricebtn 임포트 해온 컴포넌트에서만 작동
  클릭 이벤트 시 thumb위치로 부터 기준해서 클릭 지점이 가까운 thumb가 이동하도록 구현
  새로고침대응

8.10
- 숙소 위치(지도)보기 모달 개발 시작

  ****************************필수로 들어가야하는 기능들************************
  필터링기능 / 숙소 리스트 보여주는 곳 / 지도에 숙소의 위치 찍을것 / 서브페이지와 모달의 페치 로직 & 렌더링 분리할 것
  지도의 숙소 위치에 가격 표시할 것 / 가격 표시에 마우스 호버 시 숙소 정보 나타날 것 / 숙소 리스트 클릭 시 지도에 가격과 숙소 정보 나타나게 할 것
  지도의 카드를 클릭 할 시 숙소 상세페이지 이동 할 것

  ********************************오늘 구현한 로직들****************************
  지도보기 버튼 클릭 시 #hash 해시url로 모달 제어 / 모달 기본 레이아웃 및 폰트크기 구조 완성
  지도보기 버튼 클릭 시 초기 subapp에 패치해온 데이터로 모달 data사용
  subapp에서 사용한 컴포넌트 modal 안에서 레이아웃 조정 하기 위해 sass를 통해서 반응형 레이아웃으로 관리되는 css클래스들 빼기
  reponsible-style-scss폴더 안에 페이지별로 분류해서 반응형 css속성 관리 -> 추 후 반응형 레이아웃 짤 때 이 폴더 안에서 css 속성들 제어할 것

  ********************************추후 계획************************************
  기존 10개씩 페이지네이션 패치하는 방식에서 30개씩 페치해서 1, 4, 7... 버튼 클릭 시 데이터 패치하는 방식으로 변경
  초기 모달 클릭 시 데이터는 subapp에서 초기 렌더링시 패치해온 데이터 사용 ->
  그 이후 필터링 조건 클릭 시 데이터 lazy-loading 방식으로 모달 안에서 사용 하는 데이터 30개씩 limit하여 패치 해 올 것
  패치 해올 때 url을 통한 데이터 패치 방식이 아닌 모달 안에서 자체적으로 state등의 제어를 통한 방법으로 패치 할 것(모달 외에 컴포넌트 리랜더링 방지) -> 
  모달 외 subapp은 렌더링 안되게 하고 모달만 리렌더링이 발생하도록 로직 구현할 것
  모달 껏다 다시 킨 후 필터링 버튼 눌렀을 때 동일한 조건의 필터링(동일한 데이터 패치)일땐 패치를 막기 위해 useQuery 내일 공부할 것
  useQuery를 사용해 캐싱을 이용해서 불필요한 서버요청 줄일 것
  오늘 피곤하니 일찍 잘것

8.12
- 지도 모달 아웃풋 개발 끝
  내일 fetch 로직 구현 -> 마지막 반응형 할 때 화면 렌더링 최적화 시도 해야할듯 list마우스 호버시 map모달 전체 렌더링말고 list랑 overlay만 렌더링 되도록 로직 간소화할것

8.13
- 지도 모달 price 버튼 필터링 빼고 fetch 로직 끝
  모달창 생성 시 배경화면 검은색 오버레이 연결 / 스크롤바 display none or auto 연결
  백엔드 폴더 디렉토리 구조 변경
  기존 라우터 안에서 모든 로직 처리하던 것 -> controller, middlewares 폴더 만든 후 
  controller폴더 -> 라우터 대분류 별로 piece controller폴더 , main controller폴더로 분류 최종적으로 main controller에 모두 require해서 로직 처리 후 
  piece controller폴더는 가장 작은 소분류 컨트롤러로써 조합해서 새로운 main controller만들 수 있게 로직 분리
  라우터에 컨트롤러만 연결해서 router.js파일 깔끔하게 변경
  기존 try catch에서 에러처리 후 엔드포인트 생성하던것 -> controller안에서 throw error만 던져놓고 middlewares폴더 안에서 error_middle.js에서 엔드포인트 생성 후 일괄처리
  config파일 , jwt 로직, validation로직 파일들 폴더 안에 넣어서 src파일안에서 분류

  *** 내일 할 것 ***
  프라이스 버튼 연결 서버 연동 및 모달창 껏다가 다시 킬 때 스크롤 초기화 작업만 해놓고 숙소 상세페이지 리팩토링 들어가기

8.14
- 숙소상세페이지 fetch로직 백/프론트 수정 / 파일 디렉토리 구조 수정 / 레이아웃 수정 / loading component생성

8.15 
- 이미지 모달 레이아웃 로직 간소화
  숙소 상세페이지 먼저 하다가 나중에 또 고칠거 같으니 userdata사용하는 페이지랑 숙소 등록 / 업데이트 부터해야겠따..
8.16
- firebase Authentication 이용해서 프론트에서 토큰 발행 하는 로직으로 바꾸는 중
  회원가입 시 이메일 인증하고 firebbase랑 mongodb에 기존에 저장해놧던 유저데이터 연동시켜보자

8.18
- 기존 유저 데이터 파이어 베이스랑 연동 성공 / id값 mapping해서 이메일로 저장해서 쓸 것 / http 쿠키에 키 저장해놓고 유저정보 필요한 페이지 부분적으로 http 쿠키로 패치하는 훅 호출
  
8.20
- local환경에서 https로 개발 변경 / 로그인 회원가입 유저정보수정 삭제 로직 쿠키로 변경 및 이메일인증시스템 도입(내일 할 것) / private_router로 씌워서 로그인 유지
  되도록 로직 변경 / 서버에서 생성한 쿠키 필드 클라이언트에서 보냈을 때 드디어 읽었다 쓰읍 후ㅠ

8.22
- mailgun.js 이용해서 이메일 인증 이메일 보내는거 까지 완료 / 근데 이메일 인증 메일이 메일건 자체 sending domain썻더니 네이버에서 자체적으로 스팸메일 처리 해버리네 아 ㅋㅋ;;
  aws에서 서버 배포하고 DKIM, SPF 도메인 인증 무료라니ㅏ까 배포 단계해서 그거 해야할듯 / 도메인 평판 관리가 뭐지?
  timer는 웹워커로하고 익스플로러 하위버전에서는 그냥 클라이언트에서 setinterval 돌려야겟다

8.24
- 유저 회원가입(프로필 이미지, 닉네임까지 완료)절차 마무리

8.26
- 호스트 상태 체크 후 false일 경우 호스트 등록 절차 페이지 만드는중(총 3단계로 만들계획)
  호스트 등록 페이지는 prev url 체크해서 절차대로만 접근하도록 & 회원가입도 같은 로직으로 만들어야 할듯

8.27
- 숙소 초기 등록 절차 3단계 컴포넌트 & 로직구현 완료

8.29
- 숙소 등록 절차 1~12 중 세션에 데이터 담고 비교해서 달라질 시 fetch진행 / 등록 절차 중간에 멈췄을 때 '미완료'로 표시되고 등록 절차 이어갈 수 있게 로직 구현
  '미완료'상품은 lending page, sub page, detail page에서 제외시킬 것 
  셀렉트 박스나 인풋 데이터값 없을 시 버튼 비활성화
  '이전' 버튼 클릭 한 후 다시 '다음'버튼 눌렀을 때 중복 패치 생성 막음
  host footer, link-btn에서 fetch와 버튼 비활성화 로직 생성해서 컴포넌트에서는 패치함수만 내려서 재활용

8.29
- 1시간 마다 파이어베이스 토큰 재발행 시 서버쪽 요청해서 쿠키 자동 업데이트

8.31
- 리액트는 상태 변경을 감지한 후 상태 업데이트가 실제로 필요한지 판단하기 위해 내부 요소들에 대해 다시 얕은 비교를 수행하므로
  스테이트 값을 객체로 만들었을 시 변경하는 값까지 얕은 복사 진행할 것(안그러면 랜더링 안일어남)
  example.
  [{counts:'1'},{counts:'2'}]일 때 counts값을 변경할 때 배열만 스프레드 연산자로 풀어서 setState로 바꾸면 리액트가 상태변경 인식못함
  상태변경하는 값까지 map같은 메서드로 들어가서 스프레드 연산자로 복사해서 변경할 것
  
  lv0 ~ lv4까지 프론트, 백 type 및 데이터 검사 로직 완료
  데이터 패치 로직 완료

9.4
- 장소 검색 API(대중교통 없으면 항구 검색 api) > 네비게이션 api(시작점 : 대중교통 / 대중교통 없으면 장소 검색 api(항구), 도착점 : 내가 지정해놓은 도착점) > 
  내 db 호출 api 해서 내가 가지고 있는 db에 장소검색 api에 도착지에서 가장 가까운 대중교통 2개 + 네비게이션을 통한 대중교통으로부터 도착지 까지 자동차 이동거리 2개 저장

9.14
- lv 5 완료, 네비게이션 이동 경로, 터미널&공항(1개), 지하철(2개) 목적지 20km이내 검색하여 서버쪽에 저장
  20km이내에 터미널 없는 깡시골은 어떻게 처리할 지...
  섬지역은 이동경로 로직구현이 카카오 api로 한계가 있는거 같아서 제주도만 등록가능으로 제한하고, 게스트가 숙소 예약 시 이동경로 볼 수 있게 화면 추후 만들기
  lv 6 숙소 이미지 등록 개발중

9.16
- lv6, lv7완료, lv8 개발중

9.22
- lv10까지 완료

9.26
- 숙소 업데이트 백/프론트 끝

9.30
- 숙소 수정하기 개발 시작 / 기본 레이아웃 및 사이드 메뉴 개발중

10.2
- 중첩 라우팅을 통하여 app.js 라우팅 코드 단순화 시키기
  라우팅 코드 모듈형식으로 빼서 app.js코드 단순화 시키기
  중첩 라우팅 시 폴더 안에서 뿌려져 있는 라우팅 코드 추적이 어려울 수 있는데 디렉토리 구조 어떻게 해야할 지 고민해야 할 부분
  중첩 라우팅 사용 시 layout.js파일을 따로 만들지 아니면 부모 컴포넌트에서 그냥 레이아웃 정의 해놓을지?
  기존에 하나의 view에 하나의 라우팅으로 처리 한 로직에서 상위 url만 app.js에서 라우팅하고 각각의 뷰는 상위 url에서 중첩 라우팅으로 처리
  default_layout 라우팅 추가
  outlet은 프롭스 전달이 불가하니 기존에 프롭스 내려주는 값은 context api로 내려주기(스테이트 변경이나 수정이 복잡하지 않고 서버로 부터 받아온 데이터만 내려줌)
  하위 url의 outlet layout은 하위 url의 폴더 안에 part_layout폴더 안에 정의할 것

10.3
- 라우팅 구조 및 레이아웃 수정 끝
  router -> route에 상위url/뷰단위 라우팅 모듈 형식으로 관리
  outlet에서 사용하는 데이터 context state는 app.js에서 전체에서 감싸지 말고 사용하는 라우터 안에서만 감싸놓기(상태관리로 감싸놓은 구조가 많으면 헷갈림)
  뷰단위 컨텐츠는 lazy로딩으로 초기 로딩시 app.js에서는 레이아웃 단위 컴포넌트만 임포트
  기존에 세션으로 데이터 관리하던 부분 -> context api로 옮겨야 할듯
  중첩라우팅 안에 또 중첩 라우팅하는 상황이 있을 수 있으니 route모듈안에 라우트정의는 array.map이 아닌 하드코딩 갈겨놓음

10.4
- lodash isMatch 쓸 때 주의사항 *************** isMatch(a,b)를 비교할 때
  b가 null이면 무조건 true 반환함, 조건처리 필히 해놓을것

10.6
- update page, keyword까지 서버/프론트 구현완료
  이미지 사이즈 1.5mb로 제한 / 더줄일 지?
  이미지 한방에 최대 10개 등록하는게 맞나?
10.7
- price modify 서버/프론트 완료
10.11
- host update 페이지 서버/프론트 완료
  다음번에 만약 express 만든다면 dto 안에 validate 구현할 때 파라미터로 받는 방식을 써야겠음
  비슷한 유형의 data request시 계속 새로운 발리데이터를 만들어야 하는 문제가 있었음
10.11
- IntersectionObserver로 나중에 이미지 처리해보기
10.18
- 숙소 detail page 레이아웃 및 코드 구조 및 레이아웃 수정 완료

10.23
- 검색어 로직 백엔드쪽 완료
  저장소 - redis stack, mongo db
  mongo db에 숙소 등록 완료 시 검색어 저장(초성, 원본, 키워드, 분리된 단어로 분리하여 저장)
  ex.  {
    original_word: '서울시 강남구',
    choseong: 'ㅅㅇㅅ ㄱㄴㄱ',
    dissembled: 'ㅅㅓㅇㅜㄹㅅㅣ ㄱㅏㅇㄴㅏㅁㄱㅜ',
    original_address: '서울시 강남구',
    [Symbol(entityId)]: '01JAVHRGC1AY825YMA7KC1KCN5',
    [Symbol(entityKeyName)]: 'Suggestion:01JAVHRGC1AY825YMA7KC1KCN5'
  }
  redis stack server 로컬 연동 완료
  새로운 숙소 등록 했을 때, 몽고 db데이터를 redis데이터로 옮기는 동기화 작업필요.

10.24
- 예약 페이지 구조 및 레이아웃 디자인 변경 완료

10.28
- 숙소 등록페이지 폴더 구조 및 레이아웃 라우팅 구조 변경 완료

10.31
- 달력 fetch 작업중

11.4
- host mypage(예약 빼고), manage페이지 프론트 백 완료 
  <code>
</pre>
