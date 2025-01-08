import React, { useState } from "react";
import "./MessageBoxPresenter.css";

const messages = [
  {
    id: 1,
    date: "2024-12-17",
    sender: "이윤경",
    title: "제목: 제목1231231",
    content: "그만할래요",
    highlight: true,
  },
  {
    id: 2,
    date: "2024-12-17",
    sender: "김동현 교수님",
    title: "제목: 제목1231231",
    content: "빨리해라",
    highlight: false,
  },
  // 추가 메시지
];

const MessageBoxPresenter = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  return (
    <div className="message-box-container">
      <header className="header">
        <div className="header-title">
          <h1>메시지함</h1>
        </div>
      </header>
      <main className="message-box-main">
        {/* 메시지 목록 */}
        <div className="message-list">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-item ${msg.highlight ? "highlight" : ""}`}
              onClick={() => setSelectedMessage(msg)}
            >
              <p className="message-date">{msg.date}</p>
              <p className="message-sender">{msg.sender}</p>
              <p className="message-title">{msg.title}</p>
              <p className="message-preview">{msg.content}</p>
            </div>
          ))}
        </div>

        {/* 선택된 메시지 표시 */}
        <div className="message-detail">
          {selectedMessage ? (
            <>
              <h2>{selectedMessage.title}</h2>
              <div className="message-detail-header">
                <p>{selectedMessage.sender}</p>
                <p>{selectedMessage.date}</p>
              </div>
              <div className="message-content">
                {selectedMessage.content.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </>
          ) : (
            <p>메시지를 선택하세요.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default MessageBoxPresenter;
