
create table users(
    id VARCHAR(100) PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO test (client_jp, client_en, department_jp, department_en, client_official_jp, client_official_en, department_official_jp, department_official_en, currency, active, area)
VALUES ('Client 1 jp', 'Client 1 en', 'Department 1 jp', 'Department 1 en', 'Client 1 Official jp', 'Client 1 Official en', 'Department Official Jp 1', 'Department Official En 1', 0, true, 'Sendai'
);



create table holdings(
    id VARCHAR(100) PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    code VARCHAR(100),
    name VARCHAR(100),
    volume INTEGER,
    buy_price REAL,
    color VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


