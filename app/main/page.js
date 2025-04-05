'use client';

import { useState, useEffect } from 'react';

export default function MainPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuList, setMenuList] = useState([]); // 메뉴 리스트 상태 추가
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    // 🔹 DB에서 메뉴 데이터 가져오기 (POST 방식으로 변경)
    async function fetchMenu() {
      try {
        const response = await fetch('/api/menu', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}), // 기본적으로 모든 메뉴 가져오기
        });
        
        const data = await response.json();
        setMenuData(buildMenuTree(data));
      } catch (error) {
        console.error('메뉴 데이터를 불러오는 중 오류 발생:', error);
      }
    }
    fetchMenu();
  }, []);

  // 🔹 트리 구조 변환 (upper_menu_id 기반으로 계층 구조 생성)
  function buildMenuTree(menuList) {
    console.log(menuList);
    const menuMap = {};
    menuList.forEach(menu => menuMap[menu.menu_id] = { ...menu, children: [] });
    const rootMenus = [];
    menuList.forEach(menu => {
      if (menu.upper_menu_id) {
        menuMap[menu.upper_menu_id].children.push(menuMap[menu.menu_id]);
      } else {
        rootMenus.push(menuMap[menu.menu_id]);
      }
    });
    return rootMenus;
  }

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const toggleSubmenu = (menuId) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const trendingPosts = [
    { id: 1, thumbnail: '/thumnail/thumnail1.jpg', title: '인기 게시글 1', comments: 150, time: '1시간 전', author: '작성자1', flag: '/flags/KR.png', likes: 25 },
    { id: 2, thumbnail: '/thumnail/thumnail2.jpg', title: '인기 게시글 2', comments: 90, time: '2시간 전', author: '작성자2', flag: '/flags/US.png', likes: 40 },
    { id: 3, thumbnail: '/thumnail/thumnail3.jpg', title: '인기 게시글 3', comments: 200, time: '30분 전', author: '작성자3', flag: '/flags/JP.png', likes: 55 },
    { id: 4, thumbnail: '/thumnail/thumnail4.png', title: '인기 게시글 4', comments: 110, time: '5시간 전', author: '작성자4', flag: '/flags/FR.png', likes: 33 },
    { id: 5, thumbnail: '/thumnail/thumnail5.png', title: '인기 게시글 5', comments: 75, time: '10분 전', author: '작성자5', flag: '/flags/DE.png', likes: 80 },
    { id: 6, thumbnail: '/thumnail/thumnail6.png', title: '인기 게시글 6', comments: 95, time: '3시간 전', author: '작성자6', flag: '/flags/GB.png', likes: 22 },
    { id: 7, thumbnail: '/thumnail/thumnail7.png', title: '인기 게시글 7', comments: 130, time: '12시간 전', author: '작성자7', flag: '/flags/IT.png', likes: 67 },
    { id: 8, thumbnail: '/thumnail/thumnail8.jpg', title: '인기 게시글 8', comments: 50, time: '8시간 전', author: '작성자8', flag: '/flags/CN.png', likes: 10 },
    { id: 9, thumbnail: '/thumnail/thumnail9.jpg', title: '인기 게시글 9', comments: 180, time: '7시간 전', author: '작성자9', flag: '/flags/RU.png', likes: 48 },
    { id: 10, thumbnail: '/thumnail/thumnail10.png', title: '인기 게시글 10', comments: 210, time: '9시간 전', author: '작성자10', flag: '/flags/CA.png', likes: 29 },
  ];

  const humorPosts = [
    { id: 1, title: '유머 게시글 1', comments: 50 },
    { id: 2, title: '유머 게시글 2', comments: 30 },
    { id: 3, title: '유머 게시글 3', comments: 45 },
    { id: 4, title: '유머 게시글 4', comments: 20 },
    { id: 5, title: '유머 게시글 5', comments: 15 },
    { id: 6, title: '유머 게시글 6', comments: 60 },
  ];

  const hotDealPosts = [
    { id: 1, title: '핫딜 정보 1', comments: 20 },
    { id: 2, title: '핫딜 정보 2', comments: 25 },
    { id: 3, title: '핫딜 정보 3', comments: 15 },
    { id: 4, title: '핫딜 정보 4', comments: 10 },
    { id: 5, title: '핫딜 정보 5', comments: 35 },
    { id: 6, title: '핫딜 정보 6', comments: 40 },
  ];

  const politicsPosts = [
    { id: 1, title: '정치 뉴스 1', comments: 120 },
    { id: 2, title: '정치 뉴스 2', comments: 100 },
    { id: 3, title: '정치 뉴스 3', comments: 80 },
    { id: 4, title: '정치 뉴스 4', comments: 75 },
    { id: 5, title: '정치 뉴스 5', comments: 95 },
    { id: 6, title: '정치 뉴스 6', comments: 50 },
  ];


  return (
    <div>
      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}

      {/* 헤더 */}
      <div className="header-container">
        <div className="header">
          <div className="logo">
            <span className="menu-icon" onClick={toggleMenu}>☰</span> 로고
          </div>
          <div className="search">
            <input type="text" placeholder="검색어를 입력하세요." />
            <span className="search-icon">🔍</span>
          </div>
          <div className="header-icons">
            <span>🔔</span>
            <span>📩</span>
            <span>⚙️</span>
            <button className="logout">로그아웃</button>
          </div>
        </div>
      </div>

      <nav className="menu-bar">
        {menuList.length === 0 ? (
          <p>메뉴를 불러오는 중...</p>
        ) : (
          menuList.map((menu) => (
            <a key={menu.menu_id} className="menu">
              {menu.menu_name}
            </a>
          ))
        )}
      </nav>

      {/* 콘텐츠 영역 */}
      <div className="content-container">
        <div className="left-panel">
          <h2 className="board-title">🔥 인기글</h2>
          {trendingPosts.map((post) => (
            <div key={post.id} className="post">
              <img src={post.thumbnail} alt="썸네일" className="thumbnail" />
              <div className="post-info">
                <div className="post-title">
                  {post.title} <span className="comment-count">[{post.comments}]</span>
                </div>
                <div className="post-meta">
                  {post.time} / {post.author} <img src={post.flag} alt="국기" className="flag" /> / 추천 {post.likes}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 오른쪽: 유머 / 핫딜 / 정치 */}
        <div className="right-panel">
          <div className="board">
            <h2 className="board-title">😂 유머</h2>
            {humorPosts.map((post) => (
              <div key={post.id} className="right-post">
                {post.title} <span className="comment-count">[{post.comments}]</span>
              </div>
            ))}
          </div>
          <div className="board">
            <h2 className="board-title">🔥 핫딜</h2>
            {hotDealPosts.map((post) => (
              <div key={post.id} className="right-post">
                {post.title} <span className="comment-count">[{post.comments}]</span>
              </div>
            ))}
          </div>
          <div className="board">
            <h2 className="board-title">📰 정치</h2>
            {politicsPosts.map((post) => (
              <div key={post.id} className="right-post">
                {post.title} <span className="comment-count">[{post.comments}]</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 스타일링 */}
      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 10;
        }
        .header-container {
          background: #fff;
          padding: 15px; /* 기존보다 2배 높게 */
          max-width: 1400px;
          margin: 0 auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          display: flex;
          align-items: center;
          font-size: 24px;
          font-weight: bold;
        }
        .menu-icon {
          cursor: pointer;
          font-size: 32px; /* 아이콘 크기 증가 */
          margin-right: 15px;
        }
        .search {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search input {
          padding: 12px;
          padding-right: 40px; /* 돋보기 아이콘과 간격 확보 */
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
          width: 250px;
        }
        .search-icon {
          position: absolute;
          right: 10px;
          font-size: 18px;
          color: gray;
          cursor: pointer;
        }
        .menu-bar {
          display: flex;
          background: #f5f5f5;
          justify-content: space-around;
          max-width: 1400px;
          margin: 0 auto;
          border: 1px solid #ccc;
        }
        .menu-bar a {
          text-decoration: none;
          color: #333;
          padding: 10px 20px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: -webkit-fill-available;
        }
        .menu-bar a:not(:last-child) {
          border-right: 1px solid #ccc;
        }
        .content-container {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
        }
        .left-panel, .right-panel {
          padding: 0 20px;
        }
        .left-panel {
          width: 50%;
        }
        .right-panel {
          width: 50%;
          display: flex;
          flex-direction: column;
        }
        .post {
          display: flex;
          align-items: center;
          padding: 1px 0;
        }
        .thumbnail {
          width: 80px;
          height: 60px;
          margin-right: 15px;
          border-radius: 5px; /* 부드러운 모서리 */
          object-fit: cover; /* 이미지 비율 유지하면서 꽉 차게 */
        }
        .comment-count {
          color: red;
          font-size: 17px;
          font-weight: bold;
        }
        .flag {
          width: 16px;
          height: 12px;
          margin-left: 5px;
        }
        .right-post {
          padding: 1px 0;
        }
        .board-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
          margin: 5px 0;
        }
        .board {
          margin-bottom: 10px;
        }
        .post-info {
          flex-grow: 1;
        }
        .post-title {
          font-size: 20px;
          font-weight: bold;
        }
        .post-meta {
          font-size: 15px;
          color: gray;
        }
        .header-icons {
          display: flex;
          align-items: center;
          gap: 15px; /* 아이콘과 버튼 사이 간격 조정 */
        }
        .header-icons span {
          font-size: 20px;
          cursor: pointer;
        }
        .logout {
          padding: 8px 12px;
          background-color: #ff4d4d;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}


function MenuItem({ menu, toggleSubmenu, openSubmenus }) {
  return (
    <li onClick={(event) => {
        event.stopPropagation();
        toggleSubmenu(menu.menu_id);
      }
    }>
      {menu.menu_name} <span className="submenu-icon">{openSubmenus[menu.menu_id] ? '▼' : '▶'}</span>
      {openSubmenus[menu.menu_id] && menu.children.length > 0 && (
        <ul className="submenu">
          {menu.children.map(submenu => (
            <MenuItem key={submenu.menu_id} menu={submenu} toggleSubmenu={toggleSubmenu} openSubmenus={openSubmenus} />
          ))}
        </ul>
      )}
    </li>
  );
}