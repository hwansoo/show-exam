-- Clean Data migration SQL with proper JSON handling
-- Run this AFTER running manual-migration.sql

-- Found 7 problem sets to migrate

-- Insert problem sets
INSERT INTO problem_sets (id, key, title, description, category, difficulty, is_built_in, created_at, updated_at) VALUES (
  '60b5873a-a747-4dcb-b84c-fe7153dc8e56',
  $STR$math_basic$STR$,
  $STR$기초 수학$STR$,
  $STR$기본적인 수학 개념을 다루는 문제들$STR$,
  $STR$mathematics$STR$,
  $STR$beginner$STR$,
  true,
  $STR$2024-01-01T00:00:00Z$STR$,
  $STR$2024-01-01T00:00:00Z$STR$
);

INSERT INTO problem_sets (id, key, title, description, category, difficulty, is_built_in, created_at, updated_at) VALUES (
  '8d5180d7-eb2d-45bc-bb19-c98b1b6ec037',
  $STR$physics_basic$STR$,
  $STR$기초 물리학$STR$,
  $STR$물리학의 기본 개념과 공식들$STR$,
  $STR$physics$STR$,
  $STR$beginner$STR$,
  true,
  $STR$2024-01-01T00:00:00Z$STR$,
  $STR$2024-01-01T00:00:00Z$STR$
);

INSERT INTO problem_sets (id, key, title, description, category, difficulty, is_built_in, created_at, updated_at) VALUES (
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$dip_1_2$STR$,
  $STR$디지털 영상처리 1-2장 개념 이해 문제$STR$,
  $STR$Lecture 1 (Introduction) 및 Lecture 2 (Image Fundamentals) 기반으로 구성된 디지털 영상처리 시험 대비 연습문제 30문제입니다.$STR$,
  $STR$custom$STR$,
  $STR$unknown$STR$,
  false,
  $STR$2025-07-03T11:11:38.464Z$STR$,
  $STR$2025-07-03T11:11:38.464Z$STR$
);

INSERT INTO problem_sets (id, key, title, description, category, difficulty, is_built_in, created_at, updated_at) VALUES (
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$dip_l3$STR$,
  $STR$DIP - L3 Geometric Operations$STR$,
  $STR$Lecture 3 Geometric Operations 기반 디지털 영상처리 연습문제 25문제, 배점 각 4점, 기출/모의고사 대비용 문제집입니다.$STR$,
  $STR$custom$STR$,
  $STR$unknown$STR$,
  false,
  $STR$2025-07-03T11:26:45.505Z$STR$,
  $STR$2025-07-03T11:26:45.505Z$STR$
);

INSERT INTO problem_sets (id, key, title, description, category, difficulty, is_built_in, created_at, updated_at) VALUES (
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$dip_l5$STR$,
  $STR$DIP - L5 Human Visual System and Colors$STR$,
  $STR$Lecture 5 (Human Visual System and Colors)를 기반으로 한 디지털 영상처리 연습문제 30문제, 각 문제 4점 배점, 중급-심화 시험 대비용 문제집입니다.$STR$,
  $STR$custom$STR$,
  $STR$unknown$STR$,
  false,
  $STR$2025-07-04T05:00:14.979Z$STR$,
  $STR$2025-07-04T05:00:14.979Z$STR$
);

INSERT INTO problem_sets (id, key, title, description, category, difficulty, is_built_in, created_at, updated_at) VALUES (
  'fcb54bb1-94b8-4fea-a84d-ec2ad907134b',
  $STR$test_api_1751625374164$STR$,
  $STR$Test Problem Set API$STR$,
  $STR$A test problem set created via API$STR$,
  $STR$custom$STR$,
  $STR$unknown$STR$,
  false,
  $STR$2025-07-04T10:36:14.836Z$STR$,
  $STR$2025-07-04T10:36:14.836Z$STR$
);

INSERT INTO problem_sets (id, key, title, description, category, difficulty, is_built_in, created_at, updated_at) VALUES (
  '6a0f443c-70b1-4387-b91e-01db331ac198',
  $STR$debug_test_1751625377876$STR$,
  $STR$Debug Test$STR$,
  $STR$Debug test description$STR$,
  $STR$custom$STR$,
  $STR$unknown$STR$,
  false,
  $STR$2025-07-04T10:36:18.597Z$STR$,
  $STR$2025-07-04T10:36:18.597Z$STR$
);

-- Insert problems
-- Problems for 기초 수학 (5 problems)
INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '362926e0-346c-4621-899d-459cede3fa32',
  '60b5873a-a747-4dcb-b84c-fe7153dc8e56',
  $STR$다음 중 $\sqrt{16}$의 값은?$STR$,
  $STR$single_choice$STR$,
  $JSON$["2","4","8","16"]$JSON$::jsonb,
  $JSON$1$JSON$::jsonb,
  10,
  $STR$$\sqrt{16} = 4$입니다. 16의 제곱근은 4입니다.$STR$,
  0
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '13a82479-3741-4024-bd34-8eddec13746c',
  '60b5873a-a747-4dcb-b84c-fe7153dc8e56',
  $STR$다음 중 소수인 것을 모두 고르세요.$STR$,
  $STR$multiple_choice$STR$,
  $JSON$["2","3","4","5","6","7"]$JSON$::jsonb,
  $JSON$[0,1,3,5]$JSON$::jsonb,
  15,
  $STR$소수는 1과 자기 자신으로만 나누어지는 자연수입니다. 2, 3, 5, 7이 소수입니다.$STR$,
  1
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'e1e63c25-4370-459f-838c-ac14eccf5692',
  '60b5873a-a747-4dcb-b84c-fe7153dc8e56',
  $STR$$\pi$는 무리수이다.$STR$,
  $STR$true_false$STR$,
  NULL,
  $JSON$true$JSON$::jsonb,
  10,
  $STR$$\pi$는 무리수입니다. 유한소수나 순환소수로 표현할 수 없습니다.$STR$,
  2
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '62580da4-a61d-462b-b49d-77a5a97b0e44',
  '60b5873a-a747-4dcb-b84c-fe7153dc8e56',
  $STR$$2x + 5 = 13$일 때, $x$의 값을 구하세요.$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"4"$JSON$::jsonb,
  15,
  $STR$$2x + 5 = 13$에서 $2x = 8$이므로 $x = 4$입니다.$STR$,
  3
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '17297daf-d154-45c3-8890-6b9741d8aea6',
  '60b5873a-a747-4dcb-b84c-fe7153dc8e56',
  $STR$피타고라스 정리를 설명하고, 직각삼각형에서 빗변의 길이가 5, 한 변의 길이가 3일 때 다른 한 변의 길이를 구하는 과정을 서술하세요.$STR$,
  $STR$essay$STR$,
  NULL,
  NULL,
  20,
  $STR$피타고라스 정리: $a^2 + b^2 = c^2$. 주어진 조건에서 $3^2 + b^2 = 5^2$이므로 $b^2 = 16$, 따라서 $b = 4$입니다.$STR$,
  4
);

-- Problems for 기초 물리학 (2 problems)
INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '79b9199f-5c5e-4943-a75e-081024feeab0',
  '8d5180d7-eb2d-45bc-bb19-c98b1b6ec037',
  $STR$자유낙하하는 물체의 가속도는 대략 얼마인가?$STR$,
  $STR$single_choice$STR$,
  $JSON$["$9.8 \\text{ m/s}$","$9.8 \\text{ m/s}^2$","$98 \\text{ m/s}^2$","$0.98 \\text{ m/s}^2$"]$JSON$::jsonb,
  $JSON$1$JSON$::jsonb,
  10,
  $STR$지구에서 중력가속도는 약 $9.8 \text{ m/s}^2$입니다.$STR$,
  0
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '87f04b05-a05a-4b27-8a5d-1de29cf1b133',
  '8d5180d7-eb2d-45bc-bb19-c98b1b6ec037',
  $STR$운동 법칙에 관한 문제$STR$,
  $STR$compound$STR$,
  NULL,
  NULL,
  30,
  NULL,
  1
);

-- Problems for 디지털 영상처리 1-2장 개념 이해 문제 (30 problems)
INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '19eaf055-5b90-4432-a671-8ef145f5888b',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$디지털 영상처리의 고수준(high-level) 단계에서 수행하는 작업으로 올바른 것은 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["노이즈 제거","엣지 검출","영상 이해","영상 보강"]$JSON$::jsonb,
  $JSON$2$JSON$::jsonb,
  1,
  $STR$고수준 단계에서는 이미지 이해(컴퓨터 비전) 단계로, 영상의 의미를 해석하는 단계입니다.$STR$,
  0
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '01c66708-12c9-4127-854b-0e0bd784fec0',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$아날로그 이미지와 디지털 이미지의 차이에 대한 설명으로 옳은 것은?$STR$,
  $STR$single_choice$STR$,
  $JSON$["디지털 이미지는 연속적인 값으로 표현된다.","디지털 이미지는 이산적인 값으로 표현된다.","아날로그 이미지는 이산적인 값으로 표현된다.","디지털 이미지는 샘플링이 필요 없다."]$JSON$::jsonb,
  $JSON$1$JSON$::jsonb,
  1,
  $STR$디지털 이미지는 공간적으로 샘플링하여 이산적인 픽셀 값으로 표현됩니다.$STR$,
  1
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '70cb6d46-5926-4363-a902-95bacd116e2f',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$디지털 이미지 처리는 X-ray 및 CT 데이터에도 적용될 수 있다.$STR$,
  $STR$true_false$STR$,
  NULL,
  $JSON$true$JSON$::jsonb,
  1,
  $STR$영상처리는 X-ray, CT, Radar, Electron Microscopy 등 다양한 영상 모달리티에 적용 가능합니다.$STR$,
  2
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'b0523edf-4ed4-4c93-91a1-158e3daaa4cf',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$디지털 이미지의 가장 작은 단위를 무엇이라고 부릅니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"픽셀"$JSON$::jsonb,
  1,
  $STR$픽셀(Pixel)은 Digital Image의 가장 작은 단위로, 각각의 위치에 대응하는 이산 값입니다.$STR$,
  3
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'cf857ca8-2de5-413c-9d1c-efc00e2d8a45',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$디지털 영상처리의 중수준(Mid-level) 단계에서는 영상을 어떤 것으로 변환합니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"특징"$JSON$::jsonb,
  1,
  $STR$중수준 단계에서는 영상에서 경계, 라인, 영역 등 특징(feature)으로 변환하여 정보를 추출합니다.$STR$,
  4
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '4a58ad74-a744-4229-94f2-36a6330cde23',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$영상의 샘플링과 관련하여 적절한 조건은 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["언제나 임의의 샘플링 주파수를 사용 가능하다.","샘플링 주파수는 신호의 최대 주파수의 두 배 이상이어야 한다.","샘플링 주파수는 신호의 최대 주파수의 절반 이하이어야 한다.","샘플링과 퀀타이제이션은 동일한 과정이다."]$JSON$::jsonb,
  $JSON$1$JSON$::jsonb,
  1,
  $STR$샘플링 이론(Nyquist 기준)에 따르면 최대 주파수의 두 배 이상으로 샘플링해야 정확한 재구성이 가능합니다.$STR$,
  5
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'cc52f680-5a00-48df-8d6b-88d1d8d19284',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$히스토그램 평활화는 이미지의 명암 분포를 균일하게 만들기 위한 방법이다.$STR$,
  $STR$true_false$STR$,
  NULL,
  $JSON$true$JSON$::jsonb,
  1,
  $STR$히스토그램 평활화는 이미지의 대비를 향상시키기 위해 명암 분포를 균등하게 분산시키는 기법입니다.$STR$,
  6
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'b9dde021-63b0-4736-bed9-f310194df283',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$영상의 감마 보정은 무엇을 해결하기 위한 과정입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["해상도 부족","주파수 왜곡","디스플레이의 비선형 출력","컬러 변환"]$JSON$::jsonb,
  $JSON$2$JSON$::jsonb,
  1,
  $STR$감마 보정은 디스플레이 장치의 비선형적인 출력과 입력 간 관계를 보정하는 과정입니다.$STR$,
  7
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '33ee2aff-d589-4de3-a2c2-2ccb76620d7b',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$샘플링과 퀀타이제이션은 동일한 의미를 가진다.$STR$,
  $STR$true_false$STR$,
  NULL,
  NULL,
  1,
  $STR$샘플링은 공간의 이산화, 퀀타이제이션은 값의 이산화로 서로 다른 과정입니다.$STR$,
  8
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '35715ef0-8620-4c87-9833-58f670250d37',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$히스토그램 평활화에서 사용하는 누적 밀도 함수의 약어는 무엇입니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"CDF"$JSON$::jsonb,
  1,
  $STR$누적 밀도 함수(Cumulative Density Function, CDF)를 사용하여 픽셀 값의 변환 테이블을 만듭니다.$STR$,
  9
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '399a66c8-1fd1-46ea-89e9-03e8f304c030',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$다음 중 디지털 영상처리의 저수준 단계에서 수행되는 작업은 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["영상 이해","엣지 검출","객체 인식","의미 해석"]$JSON$::jsonb,
  $JSON$1$JSON$::jsonb,
  1,
  $STR$저수준 단계는 영상 노이즈 제거, 엣지 검출, 샤프닝 등의 영상 개선 및 전처리 작업을 포함합니다.$STR$,
  10
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'b3121131-1f07-4c07-a666-f94cfeac75fe',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$다음 중 디지털 영상처리의 주요 카테고리에 포함되는 것을 모두 고르세요.$STR$,
  $STR$multiple_choice$STR$,
  $JSON$["영상 획득","영상 압축","영상 복원","영상 세분화","영상 이해","오디오 처리"]$JSON$::jsonb,
  $JSON$[0,1,2,3,4]$JSON$::jsonb,
  1,
  $STR$디지털 영상처리의 주요 카테고리는 영상 획득, 보강, 복원, 재구성, 압축, 세분화, 이해 등이 포함됩니다.$STR$,
  11
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '8b877f88-c2ce-46fa-a0bc-a6e757a2b712',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$영상의 히스토그램은 픽셀의 공간적 분포를 나타낸다.$STR$,
  $STR$true_false$STR$,
  NULL,
  NULL,
  1,
  $STR$히스토그램은 픽셀 값의 빈도를 나타내며, 공간적 분포가 아닌 밝기 분포를 보여줍니다.$STR$,
  12
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'cba20e8e-b691-45dc-8d14-fab39544b21a',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$픽셀 값이 0~255로 표현되는 이유는 몇 비트 표현을 사용하기 때문인가요?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"8"$JSON$::jsonb,
  1,
  $STR$8비트 표현을 사용하면 $2^8 = 256$ 단계로 표현되며, 0~255 범위의 픽셀 값을 사용합니다.$STR$,
  13
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'dd635067-e8d6-47e0-b862-13bd053d84d8',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$샘플링 이론에서 신호의 최대 주파수가 10 kHz일 때 최소 샘플링 주파수는 얼마입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["5 kHz","10 kHz","20 kHz","40 kHz"]$JSON$::jsonb,
  $JSON$2$JSON$::jsonb,
  1,
  $STR$최대 주파수의 두 배 이상인 20 kHz로 샘플링해야 원본 신호를 재구성할 수 있습니다.$STR$,
  14
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '3c1a84d4-b795-4c04-a872-13a3881e1ce8',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$영상의 해상도를 높이기 위해서는 보간법이 사용된다.$STR$,
  $STR$true_false$STR$,
  NULL,
  $JSON$true$JSON$::jsonb,
  1,
  $STR$해상도 증가(업샘플링) 시 bilinear, bicubic interpolation 등의 보간법을 사용합니다.$STR$,
  15
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '03a59e5c-9ec3-4527-a038-d5550b01b7db',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$영상의 크기를 변경할 때 가장 간단한 보간법의 이름은 무엇입니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"Nearest neighbor"$JSON$::jsonb,
  1,
  $STR$가장 간단한 보간법은 Nearest neighbor로, 가장 가까운 이웃 픽셀 값을 그대로 사용하는 방식입니다.$STR$,
  16
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '999c7199-3c2e-4be0-96fd-a82b7cd67865',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$디지털 이미지와 아날로그 이미지의 차이를 설명하고 디지털 영상처리의 3단계(저, 중, 고수준 처리)에 대해 각각 설명하세요.$STR$,
  $STR$essay$STR$,
  NULL,
  NULL,
  1,
  $STR$모범 답안: 디지털 이미지는 이산적인 픽셀 값으로 표현되며, 샘플링 및 퀀타이제이션 과정을 거친다. 저수준: 노이즈 제거 및 개선, 중수준: 특징 추출, 고수준: 이미지 이해/분석.$STR$,
  17
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '41730cad-8129-46bb-af79-5b8a52e3cfa4',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$다음 중 영상의 샘플링 주파수와 가장 관련이 깊은 이론은 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["Fourier Transform","Nyquist Theorem","Convolution Theorem","Sampling Law"]$JSON$::jsonb,
  $JSON$1$JSON$::jsonb,
  1,
  $STR$샘플링 주파수는 Nyquist Theorem과 관련되어 있으며, 최대 주파수의 두 배 이상 샘플링해야 함을 알려줍니다.$STR$,
  18
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'f4f458f0-bc72-4d75-b2e0-d5fd44e52267',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$디지털 영상의 해상도를 높이기 위해 사용되는 보간법 중 가장 복잡한 것은 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["Nearest neighbor","Bilinear","Bicubic","Biquartic"]$JSON$::jsonb,
  $JSON$2$JSON$::jsonb,
  1,
  $STR$Bicubic interpolation은 주변 16픽셀을 고려하여 계산하며 가장 복잡합니다.$STR$,
  19
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'f5264434-61dc-46f6-a986-a462b1dc3e17',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$감마 보정은 이미지의 노이즈를 제거하기 위한 과정이다.$STR$,
  $STR$true_false$STR$,
  NULL,
  NULL,
  1,
  $STR$감마 보정은 디스플레이의 비선형 출력을 보정하는 과정으로, 노이즈 제거와는 관련이 없습니다.$STR$,
  20
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '323c1f34-7fb9-4df1-b787-daa0a66544ca',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$히스토그램 평활화는 이미지의 어떤 특성을 개선합니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"대비"$JSON$::jsonb,
  1,
  $STR$히스토그램 평활화는 이미지의 contrast(대비)를 개선하는 기법입니다.$STR$,
  21
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '0e776a76-78af-4b0a-8e90-549c8c02be3b',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$다음 중 저수준 처리에 속하지 않는 것은 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["샤프닝","노이즈 제거","엣지 검출","객체 인식"]$JSON$::jsonb,
  $JSON$3$JSON$::jsonb,
  1,
  $STR$객체 인식은 고수준 처리 단계에 속합니다.$STR$,
  22
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '82352f2e-7565-416a-8e5b-461bcd318cd7',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$다음 중 디지털 이미지의 크기 조절에 사용되는 보간법을 모두 고르세요.$STR$,
  $STR$multiple_choice$STR$,
  $JSON$["Nearest neighbor","Bilinear","Bicubic","FFT","Convolution"]$JSON$::jsonb,
  $JSON$[0,1,2]$JSON$::jsonb,
  1,
  $STR$크기 조절(업샘플링/다운샘플링) 시 Nearest neighbor, Bilinear, Bicubic 보간법을 사용합니다.$STR$,
  23
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '6f4adbc2-96ce-4e3e-89b4-959866432695',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$샘플링 주파수가 부족하면 에일리어싱(Aliasing) 현상이 발생할 수 있다.$STR$,
  $STR$true_false$STR$,
  NULL,
  $JSON$true$JSON$::jsonb,
  1,
  $STR$샘플링 주파수가 부족할 경우 높은 주파수 성분이 잘못 해석되어 aliasing이 발생합니다.$STR$,
  24
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '23a4fcac-c631-40bb-a073-df6768fe2d5c',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$감마 보정에서 사용하는 전형적인 함수 형태는 무엇입니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"멱 함수"$JSON$::jsonb,
  1,
  $STR$감마 보정은 $f(x) = x^{\gamma}$ 형태의 멱(power) 함수를 사용합니다.$STR$,
  25
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '6be75104-cad7-4b94-b2c2-b67f3e5a6f67',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$영상의 대비 향상 기법으로 사용되는 방법은 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["샘플링","퀀타이제이션","히스토그램 평활화","보간"]$JSON$::jsonb,
  $JSON$2$JSON$::jsonb,
  1,
  $STR$히스토그램 평활화는 이미지의 contrast(대비)를 향상시키는 데 사용됩니다.$STR$,
  26
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'c80bc7ee-1447-4c52-a08e-3b273b73ad71',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$디지털 이미지는 공간적으로 연속적인 값으로 표현된다.$STR$,
  $STR$true_false$STR$,
  NULL,
  NULL,
  1,
  $STR$디지털 이미지는 공간적으로 이산적인 픽셀 배열로 표현됩니다.$STR$,
  27
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '374c7b64-71b8-463d-b195-5d6d606dfa0f',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$영상에서 픽셀의 공간적 해상도를 결정하는 것은 무엇입니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"샘플링"$JSON$::jsonb,
  1,
  $STR$샘플링은 픽셀 간격을 결정하며 영상의 공간적 해상도를 결정합니다.$STR$,
  28
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '4f60378d-a4e4-412e-b7c0-79dc229f9ae0',
  '304508c4-b962-4dd5-bd76-367d6050a3cf',
  $STR$디지털 영상처리의 샘플링, 퀀타이제이션, 감마 보정, 히스토그램 평활화의 목적과 중요성에 대해 설명하세요.$STR$,
  $STR$essay$STR$,
  NULL,
  NULL,
  1,
  $STR$모범 답안: 샘플링은 공간적 이산화를, 퀀타이제이션은 값의 이산화를, 감마 보정은 디스플레이 비선형 보정을, 히스토그램 평활화는 대비 향상을 위해 사용되며, 각각의 과정은 영상처리의 품질을 높이는 데 필수적입니다.$STR$,
  29
);

-- Problems for DIP - L3 Geometric Operations (25 problems)
INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '4d80ca33-b9e5-4e7d-93a6-85016b360fb3',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$영상 기하학적 연산 중 영상의 위치를 이동시키는 연산은 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["Scale","Shift","Flip","Shear"]$JSON$::jsonb,
  $JSON$1$JSON$::jsonb,
  4,
  $STR$Shift는 영상의 픽셀 위치를 x, y 방향으로 이동시키는 연산입니다.$STR$,
  0
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'aa723c1e-7679-4476-85c2-346a93360f63',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$영상의 크기를 변경하는 기하학적 연산은 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["Rotation","Flip","Scale","Shear"]$JSON$::jsonb,
  $JSON$2$JSON$::jsonb,
  4,
  $STR$Scale은 영상의 크기를 확대하거나 축소하는 연산입니다.$STR$,
  1
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'a2ef4d26-88af-42a8-841e-74dde077a10e',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$Flip 연산은 영상을 좌우 또는 상하로 뒤집는 연산이다.$STR$,
  $STR$true_false$STR$,
  NULL,
  $JSON$true$JSON$::jsonb,
  4,
  $STR$Flip은 영상의 축을 기준으로 뒤집는 연산으로, 상하 또는 좌우 반전이 가능합니다.$STR$,
  2
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '5c80f7e3-7440-4ebe-ad47-f518ff526fa1',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$기하학적 변환에서 영상의 각도를 바꾸는 연산을 무엇이라고 합니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"Rotation"$JSON$::jsonb,
  4,
  $STR$Rotation은 영상을 중심축을 기준으로 특정 각도로 회전시키는 연산입니다.$STR$,
  3
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '172b2cbc-7996-4ff6-a154-fcf94842fcf5',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$기하학적 연산 중 직사각형 모양을 평행사변형으로 만드는 변환을 무엇이라 합니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"Shear"$JSON$::jsonb,
  4,
  $STR$Shear 변환은 한 축을 기준으로 픽셀의 위치를 비스듬히 이동시켜 평행사변형 형태로 변형합니다.$STR$,
  4
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'ca1909f0-1aef-4c9f-a353-ce1cebb2b4b0',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$Affine Transformation의 특징으로 올바른 것은 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["거리 보존","각도 보존","직선성과 평행성 보존","면적 보존"]$JSON$::jsonb,
  $JSON$2$JSON$::jsonb,
  4,
  $STR$Affine 변환은 직선성과 평행성을 보존하며, 거리와 각도, 면적은 보존하지 않습니다.$STR$,
  5
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '178336c5-1a1e-40ec-8ac1-7b067e9a6f2c',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$다음 중 Affine Transformation에 속하는 변환을 모두 고르세요.$STR$,
  $STR$multiple_choice$STR$,
  $JSON$["Shift","Scale","Rotation","Shear","Perspective","Nonlinear"]$JSON$::jsonb,
  $JSON$[0,1,2,3]$JSON$::jsonb,
  4,
  $STR$Affine Transformation에는 Shift, Scale, Rotation, Shear가 포함되며, Perspective 및 Nonlinear 변환은 포함되지 않습니다.$STR$,
  6
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '07d04eae-7325-4d85-b542-5fe41cae9578',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$Affine Transformation은 직선성을 보존하지 않는다.$STR$,
  $STR$true_false$STR$,
  NULL,
  NULL,
  4,
  $STR$Affine 변환은 직선성과 평행성을 보존하는 것이 특징입니다.$STR$,
  7
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '2c2055f6-8229-40da-a714-552db7525215',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$디지털 영상처리에서 Affine Transformation을 적용한 후 역변환을 적용할 때 필요한 연산은 무엇입니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"Interpolation"$JSON$::jsonb,
  4,
  $STR$역변환 후 픽셀 값은 이산적인 위치에 맞지 않기 때문에 Interpolation이 필요합니다.$STR$,
  8
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '157eadb2-3b6d-4cad-a29d-750e7f565c5c',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$다음 중 Affine Transformation 후 사용되는 Interpolation 방법으로 올바른 것은 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["Nearest Neighbor","Discrete Cosine Transform","Fourier Transform","Quantization"]$JSON$::jsonb,
  NULL,
  4,
  $STR$Affine Transformation 후 보간법으로 Nearest Neighbor, Bilinear, Bicubic Interpolation 등을 사용합니다.$STR$,
  9
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'dfefb1d1-f27d-4e0f-bf31-55e6d8d56962',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$영상의 부분 픽셀 이동(half pixel shift)을 정확히 처리하기 위해 사용하는 방법으로 옳은 것은 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["Quantization","Fourier Transform과 Linear Phase Modulation","Gamma Correction","Histogram Equalization"]$JSON$::jsonb,
  $JSON$1$JSON$::jsonb,
  4,
  $STR$부분 픽셀 이동은 Fourier Transform과 Linear Phase Modulation을 사용하여 정확하게 처리합니다.$STR$,
  10
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'a23609a4-08e9-4f85-9493-1520af7ae6dc',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$Affine Transformation은 영상의 크기를 변경하면서 기하학적 왜곡을 유발하지 않는다.$STR$,
  $STR$true_false$STR$,
  NULL,
  NULL,
  4,
  $STR$Affine 변환은 기하학적 왜곡(거리, 각도, 면적)을 유발할 수 있으나 직선성과 평행성은 보존합니다.$STR$,
  11
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '70fbe190-2efb-4a05-b332-64f1b531a028',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$회전을 정확하게 처리하기 위한 보간법으로 사용되는 것은 무엇입니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"Sinc Interpolation"$JSON$::jsonb,
  4,
  $STR$회전 시 정확한 처리를 위해 Sinc Interpolation을 사용합니다.$STR$,
  12
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '1f248e61-a05f-4ef6-840a-1ef30bc1ecea',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$Affine Transformation 이후 적용할 수 있는 보간법을 모두 고르세요.$STR$,
  $STR$multiple_choice$STR$,
  $JSON$["Nearest Neighbor","Bilinear","Bicubic","Sinc Interpolation","Gamma Correction"]$JSON$::jsonb,
  $JSON$[0,1,2,3]$JSON$::jsonb,
  4,
  $STR$Affine 변환 후 보간법으로 Nearest Neighbor, Bilinear, Bicubic, Sinc Interpolation을 사용할 수 있습니다.$STR$,
  13
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '8d199b2f-d226-4248-9f5f-fdffc2d5c485',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$다음 중 Affine Transformation의 수학적 표현으로 올바른 것은 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["$$ x' = ax + by + c, \\\\ y' = dx + ey + f $$","$$ x' = x^2 + y^2, \\\\ y' = xy $$","$$ x' = \\sin(x) + y, \\\\ y' = x + \\cos(y) $$","$$ x' = x \\times y, \\\\ y' = y \\times x $$"]$JSON$::jsonb,
  NULL,
  4,
  $STR$Affine 변환은 선형 변환과 이동의 결합으로, $$ x' = ax + by + c, \\ y' = dx + ey + f $$ 형태로 표현됩니다.$STR$,
  14
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '8b68f785-c3f7-4a65-b85f-01dbf17cf2fa',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$Affine Transformation은 Perspective Transformation보다 단순하며 계산 비용이 낮다.$STR$,
  $STR$true_false$STR$,
  NULL,
  $JSON$true$JSON$::jsonb,
  4,
  $STR$Affine 변환은 Perspective 변환보다 구조가 단순하며 계산 비용이 낮습니다.$STR$,
  15
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'fa08ede7-b6f4-4d2b-b5f4-71be41a5e7ed',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$Affine Transformation에서 변환 행렬의 크기는 몇 x 몇 입니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"2x3"$JSON$::jsonb,
  4,
  $STR$Affine 변환 행렬은 2x3 크기의 행렬로 표현됩니다.$STR$,
  16
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'ce1d1062-81ca-4c92-837b-1d6ff3073f5c',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$Affine Transformation의 행렬 표현에서 선형 변환 부분은 몇 x 몇 행렬입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["2x2","3x3","2x3","3x2"]$JSON$::jsonb,
  NULL,
  4,
  $STR$Affine 변환의 선형 변환 부분은 2x2 행렬입니다.$STR$,
  17
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '47c3c8ba-996d-4abd-b478-0d217326a5af',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$Affine Transformation은 영상을 뒤틀거나 비스듬히 이동시키는 Shear 변환도 포함한다.$STR$,
  $STR$true_false$STR$,
  NULL,
  $JSON$true$JSON$::jsonb,
  4,
  $STR$Affine 변환에는 Shear 변환이 포함됩니다.$STR$,
  18
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'dbea846d-4e57-4bc6-8336-b331eb170953',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$영상처리에서 Bilinear 보간법은 몇 개의 주변 픽셀을 사용합니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"4"$JSON$::jsonb,
  4,
  $STR$Bilinear 보간법은 주변 4개의 픽셀을 사용하여 보간합니다.$STR$,
  19
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '17400522-d932-4895-9a03-11e7448b0973',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$영상처리에서 Bicubic 보간법은 몇 개의 주변 픽셀을 사용합니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"16"$JSON$::jsonb,
  4,
  $STR$Bicubic 보간법은 주변 16개의 픽셀을 사용하여 보간합니다.$STR$,
  20
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '6a59a0a2-c076-43fe-8453-a0b2f4c5bbc5',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$다음 중 기하학적 변환의 주요 목적을 모두 고르세요.$STR$,
  $STR$multiple_choice$STR$,
  $JSON$["영상의 크기 변경","영상의 위치 변경","영상의 색상 변경","영상의 회전","영상의 변형"]$JSON$::jsonb,
  $JSON$[0,1,3,4]$JSON$::jsonb,
  4,
  $STR$기하학적 변환의 주요 목적은 크기 변경, 위치 변경, 회전, 변형이며, 색상 변경은 포함되지 않습니다.$STR$,
  21
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '8866c2e0-260a-4931-a72a-6ec1f0cc4cd7',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$기하학적 변환에서 역변환 시 발생하는 문제를 해결하기 위해 주로 사용하는 기법은 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["Quantization","Histogram Equalization","Gamma Correction","Interpolation"]$JSON$::jsonb,
  $JSON$3$JSON$::jsonb,
  4,
  $STR$역변환 시 부정확한 픽셀 위치가 발생하므로 Interpolation 기법을 사용하여 해결합니다.$STR$,
  22
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '28eeecd7-e91c-496a-b4a7-c0fcf050d5d1',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$Affine Transformation 이후 역변환 없이도 영상의 위치가 원상복귀된다.$STR$,
  $STR$true_false$STR$,
  NULL,
  NULL,
  4,
  $STR$Affine 변환 이후 원상복귀를 위해서는 반드시 역변환이 필요합니다.$STR$,
  23
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'f2365a64-eb03-4094-a60a-8d38a6c7c3e6',
  'f20f42b1-27ae-4db4-a677-73128cafeeaf',
  $STR$Affine Transformation의 수학적 정의와 특징(직선성, 평행성, 면적/각도/거리 보존 여부)에 대해 설명하세요.$STR$,
  $STR$essay$STR$,
  NULL,
  NULL,
  4,
  $STR$모범 답안: Affine 변환은 $$ x' = ax + by + c, \\ y' = dx + ey + f $$ 형태로 표현되며, 직선성과 평행성을 보존하지만 면적, 각도, 거리는 보존하지 않습니다.$STR$,
  24
);

-- Problems for DIP - L5 Human Visual System and Colors (30 problems)
INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '60e4fa45-28be-4a54-9480-c37eb8127b51',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$HSI 색상 모델에서 'H'는 무엇을 의미합니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["Hue","Highlight","Height","Heat"]$JSON$::jsonb,
  NULL,
  4,
  $STR$'H'는 Hue(색상)를 의미하며 색상의 주파수를 나타냅니다.$STR$,
  0
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '44c15d0b-8bab-4402-bf29-e4a12599fa44',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$다음 중 인간의 색 지각을 설명하는 요소가 아닌 것은 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["Hue","Saturation","Intensity","Transparency"]$JSON$::jsonb,
  $JSON$3$JSON$::jsonb,
  4,
  $STR$Transparency는 색 지각 요소가 아니며, 색 지각은 Hue, Saturation, Intensity로 설명됩니다.$STR$,
  1
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '74e6a4af-c51c-4dc4-a783-3ff897056dce',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$CIE 1931 XYZ 색공간은 색의 표준 표현을 제공한다.$STR$,
  $STR$true_false$STR$,
  NULL,
  $JSON$true$JSON$::jsonb,
  4,
  $STR$CIE 1931 XYZ 색공간은 색을 표준적으로 표현하기 위해 사용되는 국제 표준입니다.$STR$,
  2
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '7f4fc3aa-00b5-429b-9f86-dede76993007',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$HSI 색 모델에서 'S'는 무엇을 의미합니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"Saturation"$JSON$::jsonb,
  4,
  $STR$'Saturation'은 색의 선명함과 채도를 나타내는 요소입니다.$STR$,
  3
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '09da41a9-6cfc-42ac-9a34-228de61413a1',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$HSI 색 모델에서 'I'는 무엇을 의미합니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"Intensity"$JSON$::jsonb,
  4,
  $STR$'Intensity'는 색의 밝기, 명도를 의미합니다.$STR$,
  4
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'a84efcfa-e90d-4bb2-9408-4d6bcde84649',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$다음 중 CIE XYZ 색 공간에서 z 성분은 어떻게 정의됩니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["z = x + y","z = 1 - x - y","z = y - x","z = x - y"]$JSON$::jsonb,
  $JSON$1$JSON$::jsonb,
  4,
  $STR$CIE XYZ 색 공간에서는 z = 1 - x - y로 정의됩니다.$STR$,
  5
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'f3f879bb-eca4-4ebc-83bf-257ad95adc17',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$RGB 색상 모델은 가산 색상 모델이다.$STR$,
  $STR$true_false$STR$,
  NULL,
  $JSON$true$JSON$::jsonb,
  4,
  $STR$RGB는 빛을 섞어 색을 표현하는 가산 색상 모델입니다.$STR$,
  6
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '77bd1503-b94d-49dc-96c2-9db5e865af9a',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$CMY 색상 모델은 감산 색상 모델이다.$STR$,
  $STR$true_false$STR$,
  NULL,
  $JSON$true$JSON$::jsonb,
  4,
  $STR$CMY는 인쇄 등에서 사용하는 감산 색상 모델입니다.$STR$,
  7
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '5c418372-c7cc-4d43-a6af-ae6705adb78c',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$빨강, 녹색, 파랑의 색을 합치면 어떤 색이 됩니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"흰색"$JSON$::jsonb,
  4,
  $STR$RGB의 모든 색을 합치면 흰색(White)이 됩니다.$STR$,
  8
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '22d80bc2-f5cf-49fe-b30b-717c2be14c2b',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$CMY 색상 모델에서 Cyan은 어떤 RGB 색상의 조합으로 표현됩니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"Green + Blue"$JSON$::jsonb,
  4,
  $STR$CMY에서 Cyan은 Green과 Blue의 결합으로 표현됩니다.$STR$,
  9
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '147ba53b-944b-41b3-ab99-1e1c6426958d',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$HSI 색 모델에서 Hue는 무엇을 나타냅니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["색의 강도","색의 밝기","주 색상","투명도"]$JSON$::jsonb,
  $JSON$2$JSON$::jsonb,
  4,
  $STR$Hue는 색상의 종류(주 색상, 색상환에서의 위치)를 나타냅니다.$STR$,
  10
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '090eeeb5-04b9-4d0c-9ec5-7251eb33cc62',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$다음 중 HSI 모델의 구성 요소를 모두 고르세요.$STR$,
  $STR$multiple_choice$STR$,
  $JSON$["Hue","Saturation","Intensity","Transparency","Value"]$JSON$::jsonb,
  $JSON$[0,1,2]$JSON$::jsonb,
  4,
  $STR$HSI 모델의 구성 요소는 Hue, Saturation, Intensity입니다.$STR$,
  11
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '114eed01-f13a-4fe0-a714-efe2820d2241',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$색도(Chromaticity)는 Hue와 Saturation으로 결정된다.$STR$,
  $STR$true_false$STR$,
  NULL,
  $JSON$true$JSON$::jsonb,
  4,
  $STR$색도는 색상의 순수한 속성으로 Hue와 Saturation의 조합으로 표현됩니다.$STR$,
  12
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'c224bb00-fadd-4500-9259-93b6deebff3a',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$RGB 모델에서 G는 어떤 색을 의미합니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"Green"$JSON$::jsonb,
  4,
  $STR$'G'는 Green(녹색)을 의미합니다.$STR$,
  13
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'b4ee683f-ff2f-42c0-9306-ce566abc8a03',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$RGB 모델에서 B는 어떤 색을 의미합니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"Blue"$JSON$::jsonb,
  4,
  $STR$'B'는 Blue(파랑)를 의미합니다.$STR$,
  14
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'ccedffe0-010e-4038-a5e0-324c28abd9ce',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$색의 밝기를 나타내는 요소는 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["Hue","Saturation","Intensity","Chroma"]$JSON$::jsonb,
  $JSON$2$JSON$::jsonb,
  4,
  $STR$Intensity는 색의 밝기(명도)를 나타냅니다.$STR$,
  15
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '23d26c03-b8aa-409d-bbb9-15042ed59e75',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$색의 선명도를 나타내는 요소는 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["Hue","Saturation","Intensity","Brightness"]$JSON$::jsonb,
  $JSON$1$JSON$::jsonb,
  4,
  $STR$Saturation은 색의 선명도, 채도를 나타냅니다.$STR$,
  16
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '77962504-c3a2-41e8-ab40-baf2233110e4',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$Brightness는 Intensity와 동일한 개념이다.$STR$,
  $STR$true_false$STR$,
  NULL,
  $JSON$true$JSON$::jsonb,
  4,
  $STR$Brightness와 Intensity는 실질적으로 유사하게 사용됩니다.$STR$,
  17
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '75eb551c-b929-48fb-85dd-d3be9a0050d6',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$CIE 색공간의 표준 이름을 적으세요.$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"CIE 1931 XYZ"$JSON$::jsonb,
  4,
  $STR$CIE 색공간은 CIE 1931 XYZ 색공간이 표준입니다.$STR$,
  18
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'cd92e35a-2bc4-49a9-8090-0775f8eaebae',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$색상(Hue)을 한글로 표현하면 무엇입니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"색상"$JSON$::jsonb,
  4,
  $STR$Hue는 '색상'으로 번역됩니다.$STR$,
  19
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '548f38a1-f4f6-47df-98d1-b3dc71d68c96',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$다음 중 색상 표현에 있어 가산 혼합 방식이 사용되는 것은 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["인쇄","디스플레이","염색","페인트"]$JSON$::jsonb,
  $JSON$1$JSON$::jsonb,
  4,
  $STR$디스플레이는 RGB의 가산 혼합 방식을 사용합니다.$STR$,
  20
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '524c3788-41d2-4d07-8397-1e286eba5c63',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$다음 중 CIE 색공간의 특징을 모두 고르세요.$STR$,
  $STR$multiple_choice$STR$,
  $JSON$["표준 색상 표현","x, y, z 좌표 사용","모니터 교정","조명 색상 기준 제공"]$JSON$::jsonb,
  $JSON$[0,1,3]$JSON$::jsonb,
  4,
  $STR$CIE 색공간은 표준 색상 표현, x, y, z 좌표 사용, 조명 색상 기준 제공의 특징이 있습니다.$STR$,
  21
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '1adcaf8d-38b3-4782-aa7f-579a7fc4e939',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$인간의 시각은 주관적인 색 경험을 포함한다.$STR$,
  $STR$true_false$STR$,
  NULL,
  $JSON$true$JSON$::jsonb,
  4,
  $STR$인간의 시각은 주관적인 색 경험을 기반으로 하며, HSI 모델의 기초가 됩니다.$STR$,
  22
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '33a208bd-a8e2-46d0-b67c-0ed25c875375',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$인쇄에서 사용하는 색상 모델은 무엇입니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"CMY"$JSON$::jsonb,
  4,
  $STR$인쇄에서는 CMY(또는 CMYK) 모델을 사용합니다.$STR$,
  23
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '5e93f595-37c0-4d3f-882c-8597f4d747e1',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$가산 혼합 방식에서 가장 밝은 색은 무엇입니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"흰색"$JSON$::jsonb,
  4,
  $STR$가산 혼합 방식에서 모든 색이 합쳐지면 흰색이 됩니다.$STR$,
  24
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '72dbface-9185-401b-9e1d-82b7a3e57649',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$다음 중 색채 모델이 아닌 것은 무엇입니까?$STR$,
  $STR$single_choice$STR$,
  $JSON$["RGB","CMY","HSI","FFT"]$JSON$::jsonb,
  $JSON$3$JSON$::jsonb,
  4,
  $STR$FFT는 색채 모델이 아니라 주파수 변환 방법입니다.$STR$,
  25
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '2a60e217-d173-4f39-92e8-b1ba81afad7d',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$HSI 모델은 인간의 주관적 색 경험을 표현하기 위해 만들어졌다.$STR$,
  $STR$true_false$STR$,
  NULL,
  $JSON$true$JSON$::jsonb,
  4,
  $STR$HSI 모델은 인간이 색을 인식하는 방식을 표현하기 위해 만들어졌습니다.$STR$,
  26
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '7cb15ad5-97fa-452c-96f9-7a12fb008c2d',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$Saturation을 한글로 표현하면 무엇입니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"채도"$JSON$::jsonb,
  4,
  $STR$Saturation은 '채도'로 번역됩니다.$STR$,
  27
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '23c9ea63-9aaf-4a33-85bb-eaa29b476dd8',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$Intensity를 한글로 표현하면 무엇입니까?$STR$,
  $STR$short_answer$STR$,
  NULL,
  $JSON$"명도"$JSON$::jsonb,
  4,
  $STR$Intensity는 '명도'로 번역됩니다.$STR$,
  28
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'f0866346-03f9-4475-9d90-973c13b6c082',
  '3bb08a29-d0cf-4dad-9290-fbc50c1b038b',
  $STR$HSI, RGB, CIE 색공간의 차이와 각각의 특징을 설명하세요.$STR$,
  $STR$essay$STR$,
  NULL,
  NULL,
  4,
  $STR$모범답안: RGB는 가산 혼합 색상 모델, HSI는 인간의 주관적 색 인식을 기반, CIE는 표준 색 표현을 위한 국제 표준 색공간입니다.$STR$,
  29
);

-- Problems for Test Problem Set API (2 problems)
INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'bc5b6962-b56d-4874-8cbf-1edff50b1ac2',
  'fcb54bb1-94b8-4fea-a84d-ec2ad907134b',
  $STR$What is 2 + 2?$STR$,
  $STR$single_choice$STR$,
  $JSON$["3","4","5","6"]$JSON$::jsonb,
  $JSON$1$JSON$::jsonb,
  10,
  $STR$2 + 2 = 4$STR$,
  0
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'f09f8708-ef3e-46ee-9177-bac7c49cdec6',
  'fcb54bb1-94b8-4fea-a84d-ec2ad907134b',
  $STR$The Earth is round.$STR$,
  $STR$true_false$STR$,
  NULL,
  $JSON$true$JSON$::jsonb,
  10,
  $STR$The Earth is approximately spherical.$STR$,
  1
);

-- Problems for Debug Test (1 problems)
INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '206ff081-95e1-4c58-881a-06e95be977c9',
  '6a0f443c-70b1-4387-b91e-01db331ac198',
  $STR$Test question?$STR$,
  $STR$single_choice$STR$,
  $JSON$["A","B"]$JSON$::jsonb,
  NULL,
  10,
  $STR$Test explanation$STR$,
  0
);

-- Migration completed
SELECT 'Data migration completed successfully' as status;
