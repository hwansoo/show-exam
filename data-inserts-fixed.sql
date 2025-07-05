-- Data migration SQL - Generated from JSON files
-- Run this AFTER running manual-migration.sql

-- Found 7 problem sets to migrate

-- Insert problem sets
INSERT INTO problem_sets (id, key, title, description, category, difficulty, is_built_in, created_at, updated_at) VALUES (
  'cf1fe8d0-7e49-42c4-b0b6-503f2b64ee9d',
  'math_basic',
  '기초 수학',
  '기본적인 수학 개념을 다루는 문제들',
  'mathematics',
  'beginner',
  true,
  '2024-01-01T00:00:00Z',
  '2024-01-01T00:00:00Z'
);

INSERT INTO problem_sets (id, key, title, description, category, difficulty, is_built_in, created_at, updated_at) VALUES (
  '13ca85d7-0235-412f-bc61-10e37f5c1e81',
  'physics_basic',
  '기초 물리학',
  '물리학의 기본 개념과 공식들',
  'physics',
  'beginner',
  true,
  '2024-01-01T00:00:00Z',
  '2024-01-01T00:00:00Z'
);

INSERT INTO problem_sets (id, key, title, description, category, difficulty, is_built_in, created_at, updated_at) VALUES (
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  'dip_1_2',
  '디지털 영상처리 1-2장 개념 이해 문제',
  'Lecture 1 (Introduction) 및 Lecture 2 (Image Fundamentals) 기반으로 구성된 디지털 영상처리 시험 대비 연습문제 30문제입니다.',
  'custom',
  'unknown',
  false,
  '2025-07-03T11:11:38.464Z',
  '2025-07-03T11:11:38.464Z'
);

INSERT INTO problem_sets (id, key, title, description, category, difficulty, is_built_in, created_at, updated_at) VALUES (
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  'dip_l3',
  'DIP - L3 Geometric Operations',
  'Lecture 3 Geometric Operations 기반 디지털 영상처리 연습문제 25문제, 배점 각 4점, 기출/모의고사 대비용 문제집입니다.',
  'custom',
  'unknown',
  false,
  '2025-07-03T11:26:45.505Z',
  '2025-07-03T11:26:45.505Z'
);

INSERT INTO problem_sets (id, key, title, description, category, difficulty, is_built_in, created_at, updated_at) VALUES (
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  'dip_l5',
  'DIP - L5 Human Visual System and Colors',
  'Lecture 5 (Human Visual System and Colors)를 기반으로 한 디지털 영상처리 연습문제 30문제, 각 문제 4점 배점, 중급-심화 시험 대비용 문제집입니다.',
  'custom',
  'unknown',
  false,
  '2025-07-04T05:00:14.979Z',
  '2025-07-04T05:00:14.979Z'
);

INSERT INTO problem_sets (id, key, title, description, category, difficulty, is_built_in, created_at, updated_at) VALUES (
  '42ad2736-3702-46a5-8581-3b7c9c101e28',
  'test_api_1751625374164',
  'Test Problem Set API',
  'A test problem set created via API',
  'custom',
  'unknown',
  false,
  '2025-07-04T10:36:14.836Z',
  '2025-07-04T10:36:14.836Z'
);

INSERT INTO problem_sets (id, key, title, description, category, difficulty, is_built_in, created_at, updated_at) VALUES (
  '4259cd8c-88a7-4389-b0aa-c91ba6f0b451',
  'debug_test_1751625377876',
  'Debug Test',
  'Debug test description',
  'custom',
  'unknown',
  false,
  '2025-07-04T10:36:18.597Z',
  '2025-07-04T10:36:18.597Z'
);

-- Insert problems
-- Problems for 기초 수학 (5 problems)
INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'd7b82d99-7991-4d65-90bd-623b690a1400',
  'cf1fe8d0-7e49-42c4-b0b6-503f2b64ee9d',
  '다음 중 $\\sqrt{16}$의 값은?',
  'single_choice',
  '["2","4","8","16"]',
  '1',
  10,
  '$\\sqrt{16} = 4$입니다. 16의 제곱근은 4입니다.',
  0
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'febf0990-1217-4207-a584-2e2e2f6f52bf',
  'cf1fe8d0-7e49-42c4-b0b6-503f2b64ee9d',
  '다음 중 소수인 것을 모두 고르세요.',
  'multiple_choice',
  '["2","3","4","5","6","7"]',
  '[0,1,3,5]',
  15,
  '소수는 1과 자기 자신으로만 나누어지는 자연수입니다. 2, 3, 5, 7이 소수입니다.',
  1
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '05f1e103-ab8e-484f-8d9a-22bd05e22c29',
  'cf1fe8d0-7e49-42c4-b0b6-503f2b64ee9d',
  '$\\pi$는 무리수이다.',
  'true_false',
  NULL,
  'true',
  10,
  '$\\pi$는 무리수입니다. 유한소수나 순환소수로 표현할 수 없습니다.',
  2
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '0cba1668-cb68-4afa-b795-3e80908355fb',
  'cf1fe8d0-7e49-42c4-b0b6-503f2b64ee9d',
  '$2x + 5 = 13$일 때, $x$의 값을 구하세요.',
  'short_answer',
  NULL,
  '4',
  15,
  '$2x + 5 = 13$에서 $2x = 8$이므로 $x = 4$입니다.',
  3
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '891ca757-57ff-4726-b910-3997765e73f6',
  'cf1fe8d0-7e49-42c4-b0b6-503f2b64ee9d',
  '피타고라스 정리를 설명하고, 직각삼각형에서 빗변의 길이가 5, 한 변의 길이가 3일 때 다른 한 변의 길이를 구하는 과정을 서술하세요.',
  'essay',
  NULL,
  NULL,
  20,
  '피타고라스 정리: $a^2 + b^2 = c^2$. 주어진 조건에서 $3^2 + b^2 = 5^2$이므로 $b^2 = 16$, 따라서 $b = 4$입니다.',
  4
);

-- Problems for 기초 물리학 (2 problems)
INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '8c0093d8-f519-4d25-b32b-d3d605a52798',
  '13ca85d7-0235-412f-bc61-10e37f5c1e81',
  '자유낙하하는 물체의 가속도는 대략 얼마인가?',
  'single_choice',
  '["$9.8 \\text{ m/s}$","$9.8 \\text{ m/s}^2$","$98 \\text{ m/s}^2$","$0.98 \\text{ m/s}^2$"]',
  '1',
  10,
  '지구에서 중력가속도는 약 $9.8 \\text{ m/s}^2$입니다.',
  0
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'c0d8f328-3e30-4ab3-9247-5379e697403e',
  '13ca85d7-0235-412f-bc61-10e37f5c1e81',
  '운동 법칙에 관한 문제',
  'compound',
  NULL,
  NULL,
  30,
  NULL,
  1
);

-- Problems for 디지털 영상처리 1-2장 개념 이해 문제 (30 problems)
INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '0e5a2453-354c-4eff-a3f3-d8fa5b8bd32e',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '디지털 영상처리의 고수준(high-level) 단계에서 수행하는 작업으로 올바른 것은 무엇입니까?',
  'single_choice',
  '["노이즈 제거","엣지 검출","영상 이해","영상 보강"]',
  '2',
  1,
  '고수준 단계에서는 이미지 이해(컴퓨터 비전) 단계로, 영상의 의미를 해석하는 단계입니다.',
  0
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'c3d54872-3250-41e4-b465-deb072e95f66',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '아날로그 이미지와 디지털 이미지의 차이에 대한 설명으로 옳은 것은?',
  'single_choice',
  '["디지털 이미지는 연속적인 값으로 표현된다.","디지털 이미지는 이산적인 값으로 표현된다.","아날로그 이미지는 이산적인 값으로 표현된다.","디지털 이미지는 샘플링이 필요 없다."]',
  '1',
  1,
  '디지털 이미지는 공간적으로 샘플링하여 이산적인 픽셀 값으로 표현됩니다.',
  1
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'd145f510-06a6-430f-807b-1913f91ee28a',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '디지털 이미지 처리는 X-ray 및 CT 데이터에도 적용될 수 있다.',
  'true_false',
  NULL,
  'true',
  1,
  '영상처리는 X-ray, CT, Radar, Electron Microscopy 등 다양한 영상 모달리티에 적용 가능합니다.',
  2
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '65d19f0b-8af3-478d-b67d-1bb37146a6ca',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '디지털 이미지의 가장 작은 단위를 무엇이라고 부릅니까?',
  'short_answer',
  NULL,
  '픽셀',
  1,
  '픽셀(Pixel)은 Digital Image의 가장 작은 단위로, 각각의 위치에 대응하는 이산 값입니다.',
  3
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '8c81e4db-ac22-4731-b46a-367dcfd43438',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '디지털 영상처리의 중수준(Mid-level) 단계에서는 영상을 어떤 것으로 변환합니까?',
  'short_answer',
  NULL,
  '특징',
  1,
  '중수준 단계에서는 영상에서 경계, 라인, 영역 등 특징(feature)으로 변환하여 정보를 추출합니다.',
  4
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '0076072c-8ccb-430a-8aae-50135bc1ea69',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '영상의 샘플링과 관련하여 적절한 조건은 무엇입니까?',
  'single_choice',
  '["언제나 임의의 샘플링 주파수를 사용 가능하다.","샘플링 주파수는 신호의 최대 주파수의 두 배 이상이어야 한다.","샘플링 주파수는 신호의 최대 주파수의 절반 이하이어야 한다.","샘플링과 퀀타이제이션은 동일한 과정이다."]',
  '1',
  1,
  '샘플링 이론(Nyquist 기준)에 따르면 최대 주파수의 두 배 이상으로 샘플링해야 정확한 재구성이 가능합니다.',
  5
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'ebeeaf71-a1dd-4ddf-9423-c2c892d60010',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '히스토그램 평활화는 이미지의 명암 분포를 균일하게 만들기 위한 방법이다.',
  'true_false',
  NULL,
  'true',
  1,
  '히스토그램 평활화는 이미지의 대비를 향상시키기 위해 명암 분포를 균등하게 분산시키는 기법입니다.',
  6
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '129ac831-15ea-4ca1-bab0-3b5713513de6',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '영상의 감마 보정은 무엇을 해결하기 위한 과정입니까?',
  'single_choice',
  '["해상도 부족","주파수 왜곡","디스플레이의 비선형 출력","컬러 변환"]',
  '2',
  1,
  '감마 보정은 디스플레이 장치의 비선형적인 출력과 입력 간 관계를 보정하는 과정입니다.',
  7
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '6e73cce6-5f5c-4246-93d4-a6536de7a9a5',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '샘플링과 퀀타이제이션은 동일한 의미를 가진다.',
  'true_false',
  NULL,
  NULL,
  1,
  '샘플링은 공간의 이산화, 퀀타이제이션은 값의 이산화로 서로 다른 과정입니다.',
  8
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '8dbf0c5b-b6bf-4725-92fc-cb2ff3fd3a56',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '히스토그램 평활화에서 사용하는 누적 밀도 함수의 약어는 무엇입니까?',
  'short_answer',
  NULL,
  'CDF',
  1,
  '누적 밀도 함수(Cumulative Density Function, CDF)를 사용하여 픽셀 값의 변환 테이블을 만듭니다.',
  9
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '400e3ced-584f-4b2e-b891-78029cc19993',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '다음 중 디지털 영상처리의 저수준 단계에서 수행되는 작업은 무엇입니까?',
  'single_choice',
  '["영상 이해","엣지 검출","객체 인식","의미 해석"]',
  '1',
  1,
  '저수준 단계는 영상 노이즈 제거, 엣지 검출, 샤프닝 등의 영상 개선 및 전처리 작업을 포함합니다.',
  10
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '4e39ffac-2b77-4889-b22f-287d9ae1e93f',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '다음 중 디지털 영상처리의 주요 카테고리에 포함되는 것을 모두 고르세요.',
  'multiple_choice',
  '["영상 획득","영상 압축","영상 복원","영상 세분화","영상 이해","오디오 처리"]',
  '[0,1,2,3,4]',
  1,
  '디지털 영상처리의 주요 카테고리는 영상 획득, 보강, 복원, 재구성, 압축, 세분화, 이해 등이 포함됩니다.',
  11
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '365e148a-5b87-484c-9f6f-576ad36a9ef8',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '영상의 히스토그램은 픽셀의 공간적 분포를 나타낸다.',
  'true_false',
  NULL,
  NULL,
  1,
  '히스토그램은 픽셀 값의 빈도를 나타내며, 공간적 분포가 아닌 밝기 분포를 보여줍니다.',
  12
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '8d75e635-0fc0-4592-bdfe-d3919d33b578',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '픽셀 값이 0~255로 표현되는 이유는 몇 비트 표현을 사용하기 때문인가요?',
  'short_answer',
  NULL,
  '8',
  1,
  '8비트 표현을 사용하면 $2^8 = 256$ 단계로 표현되며, 0~255 범위의 픽셀 값을 사용합니다.',
  13
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '2b6f7375-77d9-4d56-a74f-0f88704fcfc2',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '샘플링 이론에서 신호의 최대 주파수가 10 kHz일 때 최소 샘플링 주파수는 얼마입니까?',
  'single_choice',
  '["5 kHz","10 kHz","20 kHz","40 kHz"]',
  '2',
  1,
  '최대 주파수의 두 배 이상인 20 kHz로 샘플링해야 원본 신호를 재구성할 수 있습니다.',
  14
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '9581f2bc-a8fa-4836-86f5-430a7af5c80d',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '영상의 해상도를 높이기 위해서는 보간법이 사용된다.',
  'true_false',
  NULL,
  'true',
  1,
  '해상도 증가(업샘플링) 시 bilinear, bicubic interpolation 등의 보간법을 사용합니다.',
  15
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '0d1760ee-b4d9-4974-bedf-afc300dcd69b',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '영상의 크기를 변경할 때 가장 간단한 보간법의 이름은 무엇입니까?',
  'short_answer',
  NULL,
  'Nearest neighbor',
  1,
  '가장 간단한 보간법은 Nearest neighbor로, 가장 가까운 이웃 픽셀 값을 그대로 사용하는 방식입니다.',
  16
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '56b36601-2be3-4894-812d-843971405791',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '디지털 이미지와 아날로그 이미지의 차이를 설명하고 디지털 영상처리의 3단계(저, 중, 고수준 처리)에 대해 각각 설명하세요.',
  'essay',
  NULL,
  NULL,
  1,
  '모범 답안: 디지털 이미지는 이산적인 픽셀 값으로 표현되며, 샘플링 및 퀀타이제이션 과정을 거친다. 저수준: 노이즈 제거 및 개선, 중수준: 특징 추출, 고수준: 이미지 이해/분석.',
  17
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '77d071fa-9fcd-4fe8-94b9-46d98efe835b',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '다음 중 영상의 샘플링 주파수와 가장 관련이 깊은 이론은 무엇입니까?',
  'single_choice',
  '["Fourier Transform","Nyquist Theorem","Convolution Theorem","Sampling Law"]',
  '1',
  1,
  '샘플링 주파수는 Nyquist Theorem과 관련되어 있으며, 최대 주파수의 두 배 이상 샘플링해야 함을 알려줍니다.',
  18
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '91abbc7f-48fe-40ac-ae68-9d3554b60d0c',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '디지털 영상의 해상도를 높이기 위해 사용되는 보간법 중 가장 복잡한 것은 무엇입니까?',
  'single_choice',
  '["Nearest neighbor","Bilinear","Bicubic","Biquartic"]',
  '2',
  1,
  'Bicubic interpolation은 주변 16픽셀을 고려하여 계산하며 가장 복잡합니다.',
  19
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'bf2758e4-4d13-4877-b50d-39307865d034',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '감마 보정은 이미지의 노이즈를 제거하기 위한 과정이다.',
  'true_false',
  NULL,
  NULL,
  1,
  '감마 보정은 디스플레이의 비선형 출력을 보정하는 과정으로, 노이즈 제거와는 관련이 없습니다.',
  20
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'eaaf74fb-e124-43bf-ae06-4cb01d77e24f',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '히스토그램 평활화는 이미지의 어떤 특성을 개선합니까?',
  'short_answer',
  NULL,
  '대비',
  1,
  '히스토그램 평활화는 이미지의 contrast(대비)를 개선하는 기법입니다.',
  21
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'e9611655-419d-4449-930a-e4594db0da84',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '다음 중 저수준 처리에 속하지 않는 것은 무엇입니까?',
  'single_choice',
  '["샤프닝","노이즈 제거","엣지 검출","객체 인식"]',
  '3',
  1,
  '객체 인식은 고수준 처리 단계에 속합니다.',
  22
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '06a46d9b-a01a-4484-8d66-45ab06d6fabc',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '다음 중 디지털 이미지의 크기 조절에 사용되는 보간법을 모두 고르세요.',
  'multiple_choice',
  '["Nearest neighbor","Bilinear","Bicubic","FFT","Convolution"]',
  '[0,1,2]',
  1,
  '크기 조절(업샘플링/다운샘플링) 시 Nearest neighbor, Bilinear, Bicubic 보간법을 사용합니다.',
  23
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'e3c0b09d-fc65-415c-882a-a86403c501e7',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '샘플링 주파수가 부족하면 에일리어싱(Aliasing) 현상이 발생할 수 있다.',
  'true_false',
  NULL,
  'true',
  1,
  '샘플링 주파수가 부족할 경우 높은 주파수 성분이 잘못 해석되어 aliasing이 발생합니다.',
  24
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'e69964fd-4a7b-4937-8bfc-d98a16a60081',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '감마 보정에서 사용하는 전형적인 함수 형태는 무엇입니까?',
  'short_answer',
  NULL,
  '멱 함수',
  1,
  '감마 보정은 $f(x) = x^{\\gamma}$ 형태의 멱(power) 함수를 사용합니다.',
  25
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '724d4662-d878-4d31-bb54-f6ee9c31dc8a',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '영상의 대비 향상 기법으로 사용되는 방법은 무엇입니까?',
  'single_choice',
  '["샘플링","퀀타이제이션","히스토그램 평활화","보간"]',
  '2',
  1,
  '히스토그램 평활화는 이미지의 contrast(대비)를 향상시키는 데 사용됩니다.',
  26
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '4959d0eb-e5ba-4688-b7eb-7ccb44781b2f',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '디지털 이미지는 공간적으로 연속적인 값으로 표현된다.',
  'true_false',
  NULL,
  NULL,
  1,
  '디지털 이미지는 공간적으로 이산적인 픽셀 배열로 표현됩니다.',
  27
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'd0da632d-9e90-499f-a1b9-77a6de6f4f3c',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '영상에서 픽셀의 공간적 해상도를 결정하는 것은 무엇입니까?',
  'short_answer',
  NULL,
  '샘플링',
  1,
  '샘플링은 픽셀 간격을 결정하며 영상의 공간적 해상도를 결정합니다.',
  28
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '12ead1d9-a96b-4723-a68a-ed76a7b4494b',
  'a79cdaa1-3a19-4f0d-a7f8-9c158d577f44',
  '디지털 영상처리의 샘플링, 퀀타이제이션, 감마 보정, 히스토그램 평활화의 목적과 중요성에 대해 설명하세요.',
  'essay',
  NULL,
  NULL,
  1,
  '모범 답안: 샘플링은 공간적 이산화를, 퀀타이제이션은 값의 이산화를, 감마 보정은 디스플레이 비선형 보정을, 히스토그램 평활화는 대비 향상을 위해 사용되며, 각각의 과정은 영상처리의 품질을 높이는 데 필수적입니다.',
  29
);

-- Problems for DIP - L3 Geometric Operations (25 problems)
INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '27ed4fb5-3fdd-405d-974f-a406d9573e2b',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  '영상 기하학적 연산 중 영상의 위치를 이동시키는 연산은 무엇입니까?',
  'single_choice',
  '["Scale","Shift","Flip","Shear"]',
  '1',
  4,
  'Shift는 영상의 픽셀 위치를 x, y 방향으로 이동시키는 연산입니다.',
  0
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '8e8e25ec-3553-46ee-be26-73709b87c32d',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  '영상의 크기를 변경하는 기하학적 연산은 무엇입니까?',
  'single_choice',
  '["Rotation","Flip","Scale","Shear"]',
  '2',
  4,
  'Scale은 영상의 크기를 확대하거나 축소하는 연산입니다.',
  1
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'a804032f-1c7c-46a4-80ff-2c3f7f7c6c75',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  'Flip 연산은 영상을 좌우 또는 상하로 뒤집는 연산이다.',
  'true_false',
  NULL,
  'true',
  4,
  'Flip은 영상의 축을 기준으로 뒤집는 연산으로, 상하 또는 좌우 반전이 가능합니다.',
  2
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '4c489841-a82d-47d7-ac18-3015305738b2',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  '기하학적 변환에서 영상의 각도를 바꾸는 연산을 무엇이라고 합니까?',
  'short_answer',
  NULL,
  'Rotation',
  4,
  'Rotation은 영상을 중심축을 기준으로 특정 각도로 회전시키는 연산입니다.',
  3
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'c980b9d3-f3c9-425e-bbb3-4726781154d7',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  '기하학적 연산 중 직사각형 모양을 평행사변형으로 만드는 변환을 무엇이라 합니까?',
  'short_answer',
  NULL,
  'Shear',
  4,
  'Shear 변환은 한 축을 기준으로 픽셀의 위치를 비스듬히 이동시켜 평행사변형 형태로 변형합니다.',
  4
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '6f6f79c1-0d09-4dde-bb31-531af499900d',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  'Affine Transformation의 특징으로 올바른 것은 무엇입니까?',
  'single_choice',
  '["거리 보존","각도 보존","직선성과 평행성 보존","면적 보존"]',
  '2',
  4,
  'Affine 변환은 직선성과 평행성을 보존하며, 거리와 각도, 면적은 보존하지 않습니다.',
  5
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'adadf9b4-0086-46e7-9e5b-80975397b26e',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  '다음 중 Affine Transformation에 속하는 변환을 모두 고르세요.',
  'multiple_choice',
  '["Shift","Scale","Rotation","Shear","Perspective","Nonlinear"]',
  '[0,1,2,3]',
  4,
  'Affine Transformation에는 Shift, Scale, Rotation, Shear가 포함되며, Perspective 및 Nonlinear 변환은 포함되지 않습니다.',
  6
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '4581ec24-6ce9-45ad-b8c1-37da8c911ea5',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  'Affine Transformation은 직선성을 보존하지 않는다.',
  'true_false',
  NULL,
  NULL,
  4,
  'Affine 변환은 직선성과 평행성을 보존하는 것이 특징입니다.',
  7
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '0a93e499-3cf9-401d-9626-f1547e3a0f75',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  '디지털 영상처리에서 Affine Transformation을 적용한 후 역변환을 적용할 때 필요한 연산은 무엇입니까?',
  'short_answer',
  NULL,
  'Interpolation',
  4,
  '역변환 후 픽셀 값은 이산적인 위치에 맞지 않기 때문에 Interpolation이 필요합니다.',
  8
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '1c6d09b1-2ac7-43f7-9bde-442fbf1d1ac7',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  '다음 중 Affine Transformation 후 사용되는 Interpolation 방법으로 올바른 것은 무엇입니까?',
  'single_choice',
  '["Nearest Neighbor","Discrete Cosine Transform","Fourier Transform","Quantization"]',
  NULL,
  4,
  'Affine Transformation 후 보간법으로 Nearest Neighbor, Bilinear, Bicubic Interpolation 등을 사용합니다.',
  9
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '41a38865-5907-4629-acf3-e755e3aa5c8d',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  '영상의 부분 픽셀 이동(half pixel shift)을 정확히 처리하기 위해 사용하는 방법으로 옳은 것은 무엇입니까?',
  'single_choice',
  '["Quantization","Fourier Transform과 Linear Phase Modulation","Gamma Correction","Histogram Equalization"]',
  '1',
  4,
  '부분 픽셀 이동은 Fourier Transform과 Linear Phase Modulation을 사용하여 정확하게 처리합니다.',
  10
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'f05368f1-b7e7-4f0f-9e56-8eb4f5415219',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  'Affine Transformation은 영상의 크기를 변경하면서 기하학적 왜곡을 유발하지 않는다.',
  'true_false',
  NULL,
  NULL,
  4,
  'Affine 변환은 기하학적 왜곡(거리, 각도, 면적)을 유발할 수 있으나 직선성과 평행성은 보존합니다.',
  11
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'f157f065-5524-4955-a3f0-b61e203f3f1f',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  '회전을 정확하게 처리하기 위한 보간법으로 사용되는 것은 무엇입니까?',
  'short_answer',
  NULL,
  'Sinc Interpolation',
  4,
  '회전 시 정확한 처리를 위해 Sinc Interpolation을 사용합니다.',
  12
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '7667cb34-f4d1-41b7-99c4-734b07ff7d67',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  'Affine Transformation 이후 적용할 수 있는 보간법을 모두 고르세요.',
  'multiple_choice',
  '["Nearest Neighbor","Bilinear","Bicubic","Sinc Interpolation","Gamma Correction"]',
  '[0,1,2,3]',
  4,
  'Affine 변환 후 보간법으로 Nearest Neighbor, Bilinear, Bicubic, Sinc Interpolation을 사용할 수 있습니다.',
  13
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'fcfafbe3-b5fe-46b7-b2e7-1b547579848f',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  '다음 중 Affine Transformation의 수학적 표현으로 올바른 것은 무엇입니까?',
  'single_choice',
  '["$$ x'' = ax + by + c, \\\\ y'' = dx + ey + f $$","$$ x'' = x^2 + y^2, \\\\ y'' = xy $$","$$ x'' = \\sin(x) + y, \\\\ y'' = x + \\cos(y) $$","$$ x'' = x \\times y, \\\\ y'' = y \\times x $$"]',
  NULL,
  4,
  'Affine 변환은 선형 변환과 이동의 결합으로, $$ x'' = ax + by + c, \\\\ y'' = dx + ey + f $$ 형태로 표현됩니다.',
  14
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '60bcea17-ce31-4ec0-bf58-3b24531d29a1',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  'Affine Transformation은 Perspective Transformation보다 단순하며 계산 비용이 낮다.',
  'true_false',
  NULL,
  'true',
  4,
  'Affine 변환은 Perspective 변환보다 구조가 단순하며 계산 비용이 낮습니다.',
  15
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '32e6a6fa-f567-4626-bd8d-fff52909d840',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  'Affine Transformation에서 변환 행렬의 크기는 몇 x 몇 입니까?',
  'short_answer',
  NULL,
  '2x3',
  4,
  'Affine 변환 행렬은 2x3 크기의 행렬로 표현됩니다.',
  16
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '81fa93a2-ebec-465d-b2ef-744e9ae19743',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  'Affine Transformation의 행렬 표현에서 선형 변환 부분은 몇 x 몇 행렬입니까?',
  'single_choice',
  '["2x2","3x3","2x3","3x2"]',
  NULL,
  4,
  'Affine 변환의 선형 변환 부분은 2x2 행렬입니다.',
  17
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '52b316cd-a536-4c44-b92b-bb25eb60023a',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  'Affine Transformation은 영상을 뒤틀거나 비스듬히 이동시키는 Shear 변환도 포함한다.',
  'true_false',
  NULL,
  'true',
  4,
  'Affine 변환에는 Shear 변환이 포함됩니다.',
  18
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'e77e944d-8b13-4d5f-b0c3-1d0a792db627',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  '영상처리에서 Bilinear 보간법은 몇 개의 주변 픽셀을 사용합니까?',
  'short_answer',
  NULL,
  '4',
  4,
  'Bilinear 보간법은 주변 4개의 픽셀을 사용하여 보간합니다.',
  19
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'ee113f66-549e-4e35-841e-f359a8d7d63e',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  '영상처리에서 Bicubic 보간법은 몇 개의 주변 픽셀을 사용합니까?',
  'short_answer',
  NULL,
  '16',
  4,
  'Bicubic 보간법은 주변 16개의 픽셀을 사용하여 보간합니다.',
  20
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'ab841a9a-8e66-4208-870d-3bc49d8d3feb',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  '다음 중 기하학적 변환의 주요 목적을 모두 고르세요.',
  'multiple_choice',
  '["영상의 크기 변경","영상의 위치 변경","영상의 색상 변경","영상의 회전","영상의 변형"]',
  '[0,1,3,4]',
  4,
  '기하학적 변환의 주요 목적은 크기 변경, 위치 변경, 회전, 변형이며, 색상 변경은 포함되지 않습니다.',
  21
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '5add64ea-0574-4653-9d65-1eceb659f6ae',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  '기하학적 변환에서 역변환 시 발생하는 문제를 해결하기 위해 주로 사용하는 기법은 무엇입니까?',
  'single_choice',
  '["Quantization","Histogram Equalization","Gamma Correction","Interpolation"]',
  '3',
  4,
  '역변환 시 부정확한 픽셀 위치가 발생하므로 Interpolation 기법을 사용하여 해결합니다.',
  22
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '98c244a9-e854-4b41-b541-07c632b6b93b',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  'Affine Transformation 이후 역변환 없이도 영상의 위치가 원상복귀된다.',
  'true_false',
  NULL,
  NULL,
  4,
  'Affine 변환 이후 원상복귀를 위해서는 반드시 역변환이 필요합니다.',
  23
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '232767b5-5aaa-4171-997c-890929b26f74',
  '59f8f0f4-3283-4914-a878-44ffd3f4e848',
  'Affine Transformation의 수학적 정의와 특징(직선성, 평행성, 면적/각도/거리 보존 여부)에 대해 설명하세요.',
  'essay',
  NULL,
  NULL,
  4,
  '모범 답안: Affine 변환은 $$ x'' = ax + by + c, \\\\ y'' = dx + ey + f $$ 형태로 표현되며, 직선성과 평행성을 보존하지만 면적, 각도, 거리는 보존하지 않습니다.',
  24
);

-- Problems for DIP - L5 Human Visual System and Colors (30 problems)
INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '4d92af5a-707a-4807-8dac-ccdee486a142',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  'HSI 색상 모델에서 ''H''는 무엇을 의미합니까?',
  'single_choice',
  '["Hue","Highlight","Height","Heat"]',
  NULL,
  4,
  '''H''는 Hue(색상)를 의미하며 색상의 주파수를 나타냅니다.',
  0
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '8fed5fde-3eb4-4cc3-9d30-ef8a62d0fc88',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  '다음 중 인간의 색 지각을 설명하는 요소가 아닌 것은 무엇입니까?',
  'single_choice',
  '["Hue","Saturation","Intensity","Transparency"]',
  '3',
  4,
  'Transparency는 색 지각 요소가 아니며, 색 지각은 Hue, Saturation, Intensity로 설명됩니다.',
  1
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'bad6855c-5018-4977-b370-1eaa65121c87',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  'CIE 1931 XYZ 색공간은 색의 표준 표현을 제공한다.',
  'true_false',
  NULL,
  'true',
  4,
  'CIE 1931 XYZ 색공간은 색을 표준적으로 표현하기 위해 사용되는 국제 표준입니다.',
  2
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '543e8643-5b84-476d-92c5-d64c6e6e33ef',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  'HSI 색 모델에서 ''S''는 무엇을 의미합니까?',
  'short_answer',
  NULL,
  'Saturation',
  4,
  '''Saturation''은 색의 선명함과 채도를 나타내는 요소입니다.',
  3
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '0c7ba878-6f7f-43d4-83b8-77d7b81c7bde',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  'HSI 색 모델에서 ''I''는 무엇을 의미합니까?',
  'short_answer',
  NULL,
  'Intensity',
  4,
  '''Intensity''는 색의 밝기, 명도를 의미합니다.',
  4
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'ebc67fb8-b204-4712-94f6-b8202169a39b',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  '다음 중 CIE XYZ 색 공간에서 z 성분은 어떻게 정의됩니까?',
  'single_choice',
  '["z = x + y","z = 1 - x - y","z = y - x","z = x - y"]',
  '1',
  4,
  'CIE XYZ 색 공간에서는 z = 1 - x - y로 정의됩니다.',
  5
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '796faed5-e182-4cd2-9873-618c29d5e79c',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  'RGB 색상 모델은 가산 색상 모델이다.',
  'true_false',
  NULL,
  'true',
  4,
  'RGB는 빛을 섞어 색을 표현하는 가산 색상 모델입니다.',
  6
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '9915b00e-fb93-417d-bbfc-4c23de4c9715',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  'CMY 색상 모델은 감산 색상 모델이다.',
  'true_false',
  NULL,
  'true',
  4,
  'CMY는 인쇄 등에서 사용하는 감산 색상 모델입니다.',
  7
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '2ef24867-33eb-450a-b703-9e79fb34a036',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  '빨강, 녹색, 파랑의 색을 합치면 어떤 색이 됩니까?',
  'short_answer',
  NULL,
  '흰색',
  4,
  'RGB의 모든 색을 합치면 흰색(White)이 됩니다.',
  8
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '8d5f1ed7-3232-4d50-a0f4-4459b3d9d1f3',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  'CMY 색상 모델에서 Cyan은 어떤 RGB 색상의 조합으로 표현됩니까?',
  'short_answer',
  NULL,
  'Green + Blue',
  4,
  'CMY에서 Cyan은 Green과 Blue의 결합으로 표현됩니다.',
  9
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'f1d3fafd-0d87-411d-9aa3-3af060f58895',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  'HSI 색 모델에서 Hue는 무엇을 나타냅니까?',
  'single_choice',
  '["색의 강도","색의 밝기","주 색상","투명도"]',
  '2',
  4,
  'Hue는 색상의 종류(주 색상, 색상환에서의 위치)를 나타냅니다.',
  10
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '4c42fa43-f384-41e8-ac09-68a6248aaf97',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  '다음 중 HSI 모델의 구성 요소를 모두 고르세요.',
  'multiple_choice',
  '["Hue","Saturation","Intensity","Transparency","Value"]',
  '[0,1,2]',
  4,
  'HSI 모델의 구성 요소는 Hue, Saturation, Intensity입니다.',
  11
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '40d47597-ca3b-4c13-bc88-8dfe22211832',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  '색도(Chromaticity)는 Hue와 Saturation으로 결정된다.',
  'true_false',
  NULL,
  'true',
  4,
  '색도는 색상의 순수한 속성으로 Hue와 Saturation의 조합으로 표현됩니다.',
  12
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'c6fb4877-1422-4f35-8613-b2037399011f',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  'RGB 모델에서 G는 어떤 색을 의미합니까?',
  'short_answer',
  NULL,
  'Green',
  4,
  '''G''는 Green(녹색)을 의미합니다.',
  13
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '9cd2e13d-b5c3-4f22-b42c-dc182e2883cd',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  'RGB 모델에서 B는 어떤 색을 의미합니까?',
  'short_answer',
  NULL,
  'Blue',
  4,
  '''B''는 Blue(파랑)를 의미합니다.',
  14
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '7501644d-f753-4898-a3af-c6c9106ed12a',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  '색의 밝기를 나타내는 요소는 무엇입니까?',
  'single_choice',
  '["Hue","Saturation","Intensity","Chroma"]',
  '2',
  4,
  'Intensity는 색의 밝기(명도)를 나타냅니다.',
  15
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'b21bd58d-19f1-402b-b535-6f6337108b79',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  '색의 선명도를 나타내는 요소는 무엇입니까?',
  'single_choice',
  '["Hue","Saturation","Intensity","Brightness"]',
  '1',
  4,
  'Saturation은 색의 선명도, 채도를 나타냅니다.',
  16
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'cbaf6dc5-d589-4b56-85bb-f50b9cf05e82',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  'Brightness는 Intensity와 동일한 개념이다.',
  'true_false',
  NULL,
  'true',
  4,
  'Brightness와 Intensity는 실질적으로 유사하게 사용됩니다.',
  17
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'c74ca2d5-f09b-4d70-97f3-3ecacb3929d5',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  'CIE 색공간의 표준 이름을 적으세요.',
  'short_answer',
  NULL,
  'CIE 1931 XYZ',
  4,
  'CIE 색공간은 CIE 1931 XYZ 색공간이 표준입니다.',
  18
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '4e334bdf-89d9-4995-b6a6-88aacf654534',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  '색상(Hue)을 한글로 표현하면 무엇입니까?',
  'short_answer',
  NULL,
  '색상',
  4,
  'Hue는 ''색상''으로 번역됩니다.',
  19
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '227737d2-2a8b-41e9-a8a3-9ac02254eae9',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  '다음 중 색상 표현에 있어 가산 혼합 방식이 사용되는 것은 무엇입니까?',
  'single_choice',
  '["인쇄","디스플레이","염색","페인트"]',
  '1',
  4,
  '디스플레이는 RGB의 가산 혼합 방식을 사용합니다.',
  20
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '3c915205-15fb-4e40-a968-0535e6caa557',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  '다음 중 CIE 색공간의 특징을 모두 고르세요.',
  'multiple_choice',
  '["표준 색상 표현","x, y, z 좌표 사용","모니터 교정","조명 색상 기준 제공"]',
  '[0,1,3]',
  4,
  'CIE 색공간은 표준 색상 표현, x, y, z 좌표 사용, 조명 색상 기준 제공의 특징이 있습니다.',
  21
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '53f8a43d-dac0-46de-8d3c-3ddc5d742b52',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  '인간의 시각은 주관적인 색 경험을 포함한다.',
  'true_false',
  NULL,
  'true',
  4,
  '인간의 시각은 주관적인 색 경험을 기반으로 하며, HSI 모델의 기초가 됩니다.',
  22
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '5d67a1d5-7e6f-4a35-9818-fe77d3796739',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  '인쇄에서 사용하는 색상 모델은 무엇입니까?',
  'short_answer',
  NULL,
  'CMY',
  4,
  '인쇄에서는 CMY(또는 CMYK) 모델을 사용합니다.',
  23
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'fb3a28cd-d399-44e4-a23c-a16f7b2344aa',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  '가산 혼합 방식에서 가장 밝은 색은 무엇입니까?',
  'short_answer',
  NULL,
  '흰색',
  4,
  '가산 혼합 방식에서 모든 색이 합쳐지면 흰색이 됩니다.',
  24
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'fe524271-4803-41f5-97ea-d85354faec53',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  '다음 중 색채 모델이 아닌 것은 무엇입니까?',
  'single_choice',
  '["RGB","CMY","HSI","FFT"]',
  '3',
  4,
  'FFT는 색채 모델이 아니라 주파수 변환 방법입니다.',
  25
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'e620cd1a-3998-446d-9c61-d717e5f2cbf5',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  'HSI 모델은 인간의 주관적 색 경험을 표현하기 위해 만들어졌다.',
  'true_false',
  NULL,
  'true',
  4,
  'HSI 모델은 인간이 색을 인식하는 방식을 표현하기 위해 만들어졌습니다.',
  26
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '00435c88-59f4-472a-8dab-0ce800141e04',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  'Saturation을 한글로 표현하면 무엇입니까?',
  'short_answer',
  NULL,
  '채도',
  4,
  'Saturation은 ''채도''로 번역됩니다.',
  27
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '5ed3f8c4-a5e4-47d4-a866-b194f06b3888',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  'Intensity를 한글로 표현하면 무엇입니까?',
  'short_answer',
  NULL,
  '명도',
  4,
  'Intensity는 ''명도''로 번역됩니다.',
  28
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'f1424e75-ca40-4ea6-8a3f-975e382fcb3b',
  '70ca6311-2461-4672-9508-95fb2a0e8e33',
  'HSI, RGB, CIE 색공간의 차이와 각각의 특징을 설명하세요.',
  'essay',
  NULL,
  NULL,
  4,
  '모범답안: RGB는 가산 혼합 색상 모델, HSI는 인간의 주관적 색 인식을 기반, CIE는 표준 색 표현을 위한 국제 표준 색공간입니다.',
  29
);

-- Problems for Test Problem Set API (2 problems)
INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'b58743f2-6911-4bbb-b636-14528f6f2653',
  '42ad2736-3702-46a5-8581-3b7c9c101e28',
  'What is 2 + 2?',
  'single_choice',
  '["3","4","5","6"]',
  '1',
  10,
  '2 + 2 = 4',
  0
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '4471efd6-df8f-4989-9efb-d7e3f9a00978',
  '42ad2736-3702-46a5-8581-3b7c9c101e28',
  'The Earth is round.',
  'true_false',
  NULL,
  'true',
  10,
  'The Earth is approximately spherical.',
  1
);

-- Problems for Debug Test (1 problems)
INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'ea801fee-c5bd-40a8-922a-c1d62bf0a422',
  '4259cd8c-88a7-4389-b0aa-c91ba6f0b451',
  'Test question?',
  'single_choice',
  '["A","B"]',
  NULL,
  10,
  'Test explanation',
  0
);

-- Migration completed
SELECT 'Data migration completed' as status;
