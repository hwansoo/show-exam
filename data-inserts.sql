-- Data migration SQL - Generated from JSON files
-- Run this AFTER running manual-migration.sql

-- Found 7 problem sets to migrate

-- Insert problem sets
INSERT INTO problem_sets (id, key, title, description, category, difficulty, is_built_in, created_at, updated_at) VALUES (
  '2482df66-5282-43db-8019-d38ed188f390',
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
  '84f2485e-78cd-44b9-9636-1dd1138b3ed2',
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
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
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
  'edc44d2b-2984-4097-8038-189c255ecc8f',
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
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
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
  '183e7467-b3ee-40f2-9047-284e09092b0c',
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
  '246b8b0e-0632-4466-b079-f8dd7c3a1053',
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
  'f0a41286-5ae5-4e9c-8f82-82dc05662092',
  '2482df66-5282-43db-8019-d38ed188f390',
  '다음 중 $\\sqrt{16}$의 값은?',
  'single_choice',
  '"[\\"2\\",\\"4\\",\\"8\\",\\"16\\"]"',
  '"1"',
  10,
  '$\\sqrt{16} = 4$입니다. 16의 제곱근은 4입니다.',
  0
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '909cff9d-1d1a-41e0-9879-e6233b320c40',
  '2482df66-5282-43db-8019-d38ed188f390',
  '다음 중 소수인 것을 모두 고르세요.',
  'multiple_choice',
  '"[\\"2\\",\\"3\\",\\"4\\",\\"5\\",\\"6\\",\\"7\\"]"',
  '"[0,1,3,5]"',
  15,
  '소수는 1과 자기 자신으로만 나누어지는 자연수입니다. 2, 3, 5, 7이 소수입니다.',
  1
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '099f4179-9a52-45c3-bf4a-531c3a75acad',
  '2482df66-5282-43db-8019-d38ed188f390',
  '$\\pi$는 무리수이다.',
  'true_false',
  NULL,
  '"true"',
  10,
  '$\\pi$는 무리수입니다. 유한소수나 순환소수로 표현할 수 없습니다.',
  2
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'ca0130fc-3d90-4feb-b5df-71017b1cd9d5',
  '2482df66-5282-43db-8019-d38ed188f390',
  '$2x + 5 = 13$일 때, $x$의 값을 구하세요.',
  'short_answer',
  NULL,
  '"\\"4\\""',
  15,
  '$2x + 5 = 13$에서 $2x = 8$이므로 $x = 4$입니다.',
  3
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '8283317b-9ca3-406b-9805-cd790caefa71',
  '2482df66-5282-43db-8019-d38ed188f390',
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
  '43011878-e5e6-41eb-99b7-b5d5384818e9',
  '84f2485e-78cd-44b9-9636-1dd1138b3ed2',
  '자유낙하하는 물체의 가속도는 대략 얼마인가?',
  'single_choice',
  '"[\\"$9.8 \\\\\\\\text{ m/s}$\\",\\"$9.8 \\\\\\\\text{ m/s}^2$\\",\\"$98 \\\\\\\\text{ m/s}^2$\\",\\"$0.98 \\\\\\\\text{ m/s}^2$\\"]"',
  '"1"',
  10,
  '지구에서 중력가속도는 약 $9.8 \\text{ m/s}^2$입니다.',
  0
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '901b7535-b226-4177-959a-81dbbf7118fb',
  '84f2485e-78cd-44b9-9636-1dd1138b3ed2',
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
  'd3899865-9980-4aad-958d-0ff81e1e35fe',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '디지털 영상처리의 고수준(high-level) 단계에서 수행하는 작업으로 올바른 것은 무엇입니까?',
  'single_choice',
  '"[\\"노이즈 제거\\",\\"엣지 검출\\",\\"영상 이해\\",\\"영상 보강\\"]"',
  '"2"',
  1,
  '고수준 단계에서는 이미지 이해(컴퓨터 비전) 단계로, 영상의 의미를 해석하는 단계입니다.',
  0
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '5c1eb27f-f4fb-4b04-a1e3-93e7bae56322',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '아날로그 이미지와 디지털 이미지의 차이에 대한 설명으로 옳은 것은?',
  'single_choice',
  '"[\\"디지털 이미지는 연속적인 값으로 표현된다.\\",\\"디지털 이미지는 이산적인 값으로 표현된다.\\",\\"아날로그 이미지는 이산적인 값으로 표현된다.\\",\\"디지털 이미지는 샘플링이 필요 없다.\\"]"',
  '"1"',
  1,
  '디지털 이미지는 공간적으로 샘플링하여 이산적인 픽셀 값으로 표현됩니다.',
  1
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '9f69aaf6-fac9-4553-8d76-4be9f519e2ef',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '디지털 이미지 처리는 X-ray 및 CT 데이터에도 적용될 수 있다.',
  'true_false',
  NULL,
  '"true"',
  1,
  '영상처리는 X-ray, CT, Radar, Electron Microscopy 등 다양한 영상 모달리티에 적용 가능합니다.',
  2
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '7fe47b60-14fe-486b-ad81-b3608f981070',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '디지털 이미지의 가장 작은 단위를 무엇이라고 부릅니까?',
  'short_answer',
  NULL,
  '"\\"픽셀\\""',
  1,
  '픽셀(Pixel)은 Digital Image의 가장 작은 단위로, 각각의 위치에 대응하는 이산 값입니다.',
  3
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '00ca7780-a2b1-4f20-81db-a73ca94d4847',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '디지털 영상처리의 중수준(Mid-level) 단계에서는 영상을 어떤 것으로 변환합니까?',
  'short_answer',
  NULL,
  '"\\"특징\\""',
  1,
  '중수준 단계에서는 영상에서 경계, 라인, 영역 등 특징(feature)으로 변환하여 정보를 추출합니다.',
  4
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '6c9223c4-cec6-4758-be35-8dd1c9f87250',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '영상의 샘플링과 관련하여 적절한 조건은 무엇입니까?',
  'single_choice',
  '"[\\"언제나 임의의 샘플링 주파수를 사용 가능하다.\\",\\"샘플링 주파수는 신호의 최대 주파수의 두 배 이상이어야 한다.\\",\\"샘플링 주파수는 신호의 최대 주파수의 절반 이하이어야 한다.\\",\\"샘플링과 퀀타이제이션은 동일한 과정이다.\\"]"',
  '"1"',
  1,
  '샘플링 이론(Nyquist 기준)에 따르면 최대 주파수의 두 배 이상으로 샘플링해야 정확한 재구성이 가능합니다.',
  5
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '3e37cb5d-4468-4f9b-afec-328eaaa6d999',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '히스토그램 평활화는 이미지의 명암 분포를 균일하게 만들기 위한 방법이다.',
  'true_false',
  NULL,
  '"true"',
  1,
  '히스토그램 평활화는 이미지의 대비를 향상시키기 위해 명암 분포를 균등하게 분산시키는 기법입니다.',
  6
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'a2568301-9830-42a7-9166-19f5ab728409',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '영상의 감마 보정은 무엇을 해결하기 위한 과정입니까?',
  'single_choice',
  '"[\\"해상도 부족\\",\\"주파수 왜곡\\",\\"디스플레이의 비선형 출력\\",\\"컬러 변환\\"]"',
  '"2"',
  1,
  '감마 보정은 디스플레이 장치의 비선형적인 출력과 입력 간 관계를 보정하는 과정입니다.',
  7
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '6fe0d8d5-19dd-468d-83aa-130447da858d',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '샘플링과 퀀타이제이션은 동일한 의미를 가진다.',
  'true_false',
  NULL,
  '"false"',
  1,
  '샘플링은 공간의 이산화, 퀀타이제이션은 값의 이산화로 서로 다른 과정입니다.',
  8
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '827b8746-d335-49ef-ae67-283729a949da',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '히스토그램 평활화에서 사용하는 누적 밀도 함수의 약어는 무엇입니까?',
  'short_answer',
  NULL,
  '"\\"CDF\\""',
  1,
  '누적 밀도 함수(Cumulative Density Function, CDF)를 사용하여 픽셀 값의 변환 테이블을 만듭니다.',
  9
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'aa742b25-56fa-404b-97ce-b4d278a64fa0',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '다음 중 디지털 영상처리의 저수준 단계에서 수행되는 작업은 무엇입니까?',
  'single_choice',
  '"[\\"영상 이해\\",\\"엣지 검출\\",\\"객체 인식\\",\\"의미 해석\\"]"',
  '"1"',
  1,
  '저수준 단계는 영상 노이즈 제거, 엣지 검출, 샤프닝 등의 영상 개선 및 전처리 작업을 포함합니다.',
  10
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'c8878d18-3d8b-4b3c-be9c-b4f864ae44c4',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '다음 중 디지털 영상처리의 주요 카테고리에 포함되는 것을 모두 고르세요.',
  'multiple_choice',
  '"[\\"영상 획득\\",\\"영상 압축\\",\\"영상 복원\\",\\"영상 세분화\\",\\"영상 이해\\",\\"오디오 처리\\"]"',
  '"[0,1,2,3,4]"',
  1,
  '디지털 영상처리의 주요 카테고리는 영상 획득, 보강, 복원, 재구성, 압축, 세분화, 이해 등이 포함됩니다.',
  11
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '3ffac81b-a23b-4709-956c-a8cb474c70e0',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '영상의 히스토그램은 픽셀의 공간적 분포를 나타낸다.',
  'true_false',
  NULL,
  '"false"',
  1,
  '히스토그램은 픽셀 값의 빈도를 나타내며, 공간적 분포가 아닌 밝기 분포를 보여줍니다.',
  12
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '6d3bd755-384c-4c39-a9aa-a879614e8487',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '픽셀 값이 0~255로 표현되는 이유는 몇 비트 표현을 사용하기 때문인가요?',
  'short_answer',
  NULL,
  '"\\"8\\""',
  1,
  '8비트 표현을 사용하면 $2^8 = 256$ 단계로 표현되며, 0~255 범위의 픽셀 값을 사용합니다.',
  13
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '5bc665d4-c056-4092-b310-ef2dd2b0b4a7',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '샘플링 이론에서 신호의 최대 주파수가 10 kHz일 때 최소 샘플링 주파수는 얼마입니까?',
  'single_choice',
  '"[\\"5 kHz\\",\\"10 kHz\\",\\"20 kHz\\",\\"40 kHz\\"]"',
  '"2"',
  1,
  '최대 주파수의 두 배 이상인 20 kHz로 샘플링해야 원본 신호를 재구성할 수 있습니다.',
  14
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '69ef3e7b-5ca3-413a-a50a-4ce4a73e0fdf',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '영상의 해상도를 높이기 위해서는 보간법이 사용된다.',
  'true_false',
  NULL,
  '"true"',
  1,
  '해상도 증가(업샘플링) 시 bilinear, bicubic interpolation 등의 보간법을 사용합니다.',
  15
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '3d17c5ce-e126-4f04-a0ad-848b627be31c',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '영상의 크기를 변경할 때 가장 간단한 보간법의 이름은 무엇입니까?',
  'short_answer',
  NULL,
  '"\\"Nearest neighbor\\""',
  1,
  '가장 간단한 보간법은 Nearest neighbor로, 가장 가까운 이웃 픽셀 값을 그대로 사용하는 방식입니다.',
  16
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '8bfb52fc-6f37-488e-98a1-25546be6f7f7',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '디지털 이미지와 아날로그 이미지의 차이를 설명하고 디지털 영상처리의 3단계(저, 중, 고수준 처리)에 대해 각각 설명하세요.',
  'essay',
  NULL,
  NULL,
  1,
  '모범 답안: 디지털 이미지는 이산적인 픽셀 값으로 표현되며, 샘플링 및 퀀타이제이션 과정을 거친다. 저수준: 노이즈 제거 및 개선, 중수준: 특징 추출, 고수준: 이미지 이해/분석.',
  17
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '3cade2b4-735d-4d5a-8f15-21831f4e5825',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '다음 중 영상의 샘플링 주파수와 가장 관련이 깊은 이론은 무엇입니까?',
  'single_choice',
  '"[\\"Fourier Transform\\",\\"Nyquist Theorem\\",\\"Convolution Theorem\\",\\"Sampling Law\\"]"',
  '"1"',
  1,
  '샘플링 주파수는 Nyquist Theorem과 관련되어 있으며, 최대 주파수의 두 배 이상 샘플링해야 함을 알려줍니다.',
  18
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '3834a4ca-77aa-4c0f-baed-d726566d8434',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '디지털 영상의 해상도를 높이기 위해 사용되는 보간법 중 가장 복잡한 것은 무엇입니까?',
  'single_choice',
  '"[\\"Nearest neighbor\\",\\"Bilinear\\",\\"Bicubic\\",\\"Biquartic\\"]"',
  '"2"',
  1,
  'Bicubic interpolation은 주변 16픽셀을 고려하여 계산하며 가장 복잡합니다.',
  19
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'd2d30177-1980-46c3-bc34-44abfd1636b1',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '감마 보정은 이미지의 노이즈를 제거하기 위한 과정이다.',
  'true_false',
  NULL,
  '"false"',
  1,
  '감마 보정은 디스플레이의 비선형 출력을 보정하는 과정으로, 노이즈 제거와는 관련이 없습니다.',
  20
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '103726c3-995d-4b69-a065-7c3fe7f972c3',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '히스토그램 평활화는 이미지의 어떤 특성을 개선합니까?',
  'short_answer',
  NULL,
  '"\\"대비\\""',
  1,
  '히스토그램 평활화는 이미지의 contrast(대비)를 개선하는 기법입니다.',
  21
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '6f8d1486-69ac-4ade-88b5-f7c57cf83867',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '다음 중 저수준 처리에 속하지 않는 것은 무엇입니까?',
  'single_choice',
  '"[\\"샤프닝\\",\\"노이즈 제거\\",\\"엣지 검출\\",\\"객체 인식\\"]"',
  '"3"',
  1,
  '객체 인식은 고수준 처리 단계에 속합니다.',
  22
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '63eff374-2066-433d-bac1-cc4ac1c209b2',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '다음 중 디지털 이미지의 크기 조절에 사용되는 보간법을 모두 고르세요.',
  'multiple_choice',
  '"[\\"Nearest neighbor\\",\\"Bilinear\\",\\"Bicubic\\",\\"FFT\\",\\"Convolution\\"]"',
  '"[0,1,2]"',
  1,
  '크기 조절(업샘플링/다운샘플링) 시 Nearest neighbor, Bilinear, Bicubic 보간법을 사용합니다.',
  23
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'dc5157bc-501d-40aa-a536-9020806a923d',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '샘플링 주파수가 부족하면 에일리어싱(Aliasing) 현상이 발생할 수 있다.',
  'true_false',
  NULL,
  '"true"',
  1,
  '샘플링 주파수가 부족할 경우 높은 주파수 성분이 잘못 해석되어 aliasing이 발생합니다.',
  24
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '7bda85c8-76a6-49df-9fa8-84f042594862',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '감마 보정에서 사용하는 전형적인 함수 형태는 무엇입니까?',
  'short_answer',
  NULL,
  '"\\"멱 함수\\""',
  1,
  '감마 보정은 $f(x) = x^{\\gamma}$ 형태의 멱(power) 함수를 사용합니다.',
  25
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '4bb8ecb1-3ecc-4234-9fd9-a5567de0eec4',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '영상의 대비 향상 기법으로 사용되는 방법은 무엇입니까?',
  'single_choice',
  '"[\\"샘플링\\",\\"퀀타이제이션\\",\\"히스토그램 평활화\\",\\"보간\\"]"',
  '"2"',
  1,
  '히스토그램 평활화는 이미지의 contrast(대비)를 향상시키는 데 사용됩니다.',
  26
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'eafbc1a0-186a-4a4b-95da-ec86f47ce759',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '디지털 이미지는 공간적으로 연속적인 값으로 표현된다.',
  'true_false',
  NULL,
  '"false"',
  1,
  '디지털 이미지는 공간적으로 이산적인 픽셀 배열로 표현됩니다.',
  27
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '1703c7ee-f45f-4662-839e-4f5cfce7af00',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
  '영상에서 픽셀의 공간적 해상도를 결정하는 것은 무엇입니까?',
  'short_answer',
  NULL,
  '"\\"샘플링\\""',
  1,
  '샘플링은 픽셀 간격을 결정하며 영상의 공간적 해상도를 결정합니다.',
  28
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'e10374ba-c181-46b0-bb87-2190ffec6135',
  'e5af9a1c-4878-40d7-bce4-eaa240fcb89a',
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
  '246f4a20-93a5-4b20-9e4a-2e3cd363a1a3',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  '영상 기하학적 연산 중 영상의 위치를 이동시키는 연산은 무엇입니까?',
  'single_choice',
  '"[\\"Scale\\",\\"Shift\\",\\"Flip\\",\\"Shear\\"]"',
  '"1"',
  4,
  'Shift는 영상의 픽셀 위치를 x, y 방향으로 이동시키는 연산입니다.',
  0
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '141683d0-7d92-459b-a02e-0d43fe03bab3',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  '영상의 크기를 변경하는 기하학적 연산은 무엇입니까?',
  'single_choice',
  '"[\\"Rotation\\",\\"Flip\\",\\"Scale\\",\\"Shear\\"]"',
  '"2"',
  4,
  'Scale은 영상의 크기를 확대하거나 축소하는 연산입니다.',
  1
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '33db1841-f7cc-4acc-9ea8-5b4636cef7e3',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  'Flip 연산은 영상을 좌우 또는 상하로 뒤집는 연산이다.',
  'true_false',
  NULL,
  '"true"',
  4,
  'Flip은 영상의 축을 기준으로 뒤집는 연산으로, 상하 또는 좌우 반전이 가능합니다.',
  2
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '077dff7c-af5d-491f-8e8f-f00ae37aa434',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  '기하학적 변환에서 영상의 각도를 바꾸는 연산을 무엇이라고 합니까?',
  'short_answer',
  NULL,
  '"\\"Rotation\\""',
  4,
  'Rotation은 영상을 중심축을 기준으로 특정 각도로 회전시키는 연산입니다.',
  3
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '7573ffde-8e7b-49ed-b7dc-317d2a0c93fd',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  '기하학적 연산 중 직사각형 모양을 평행사변형으로 만드는 변환을 무엇이라 합니까?',
  'short_answer',
  NULL,
  '"\\"Shear\\""',
  4,
  'Shear 변환은 한 축을 기준으로 픽셀의 위치를 비스듬히 이동시켜 평행사변형 형태로 변형합니다.',
  4
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '43dda807-3e14-4c79-869b-d036acfc2504',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  'Affine Transformation의 특징으로 올바른 것은 무엇입니까?',
  'single_choice',
  '"[\\"거리 보존\\",\\"각도 보존\\",\\"직선성과 평행성 보존\\",\\"면적 보존\\"]"',
  '"2"',
  4,
  'Affine 변환은 직선성과 평행성을 보존하며, 거리와 각도, 면적은 보존하지 않습니다.',
  5
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'a0f552d5-c0c6-48ec-8d39-90a2457bd737',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  '다음 중 Affine Transformation에 속하는 변환을 모두 고르세요.',
  'multiple_choice',
  '"[\\"Shift\\",\\"Scale\\",\\"Rotation\\",\\"Shear\\",\\"Perspective\\",\\"Nonlinear\\"]"',
  '"[0,1,2,3]"',
  4,
  'Affine Transformation에는 Shift, Scale, Rotation, Shear가 포함되며, Perspective 및 Nonlinear 변환은 포함되지 않습니다.',
  6
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '01bc5f23-dd80-4f3b-81ad-ea9bce330c3a',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  'Affine Transformation은 직선성을 보존하지 않는다.',
  'true_false',
  NULL,
  '"false"',
  4,
  'Affine 변환은 직선성과 평행성을 보존하는 것이 특징입니다.',
  7
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'bbf8f786-6e5e-44b6-b839-ef90a5140f67',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  '디지털 영상처리에서 Affine Transformation을 적용한 후 역변환을 적용할 때 필요한 연산은 무엇입니까?',
  'short_answer',
  NULL,
  '"\\"Interpolation\\""',
  4,
  '역변환 후 픽셀 값은 이산적인 위치에 맞지 않기 때문에 Interpolation이 필요합니다.',
  8
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'f713f402-3cef-4e71-a110-c4b473837a28',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  '다음 중 Affine Transformation 후 사용되는 Interpolation 방법으로 올바른 것은 무엇입니까?',
  'single_choice',
  '"[\\"Nearest Neighbor\\",\\"Discrete Cosine Transform\\",\\"Fourier Transform\\",\\"Quantization\\"]"',
  '"0"',
  4,
  'Affine Transformation 후 보간법으로 Nearest Neighbor, Bilinear, Bicubic Interpolation 등을 사용합니다.',
  9
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '9c875bcd-486b-468d-b250-a37fc810c671',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  '영상의 부분 픽셀 이동(half pixel shift)을 정확히 처리하기 위해 사용하는 방법으로 옳은 것은 무엇입니까?',
  'single_choice',
  '"[\\"Quantization\\",\\"Fourier Transform과 Linear Phase Modulation\\",\\"Gamma Correction\\",\\"Histogram Equalization\\"]"',
  '"1"',
  4,
  '부분 픽셀 이동은 Fourier Transform과 Linear Phase Modulation을 사용하여 정확하게 처리합니다.',
  10
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '42d96d28-2b71-4ac1-83ac-826874cd8ebd',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  'Affine Transformation은 영상의 크기를 변경하면서 기하학적 왜곡을 유발하지 않는다.',
  'true_false',
  NULL,
  '"false"',
  4,
  'Affine 변환은 기하학적 왜곡(거리, 각도, 면적)을 유발할 수 있으나 직선성과 평행성은 보존합니다.',
  11
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '3d7805c4-5c88-4349-b420-c19627654138',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  '회전을 정확하게 처리하기 위한 보간법으로 사용되는 것은 무엇입니까?',
  'short_answer',
  NULL,
  '"\\"Sinc Interpolation\\""',
  4,
  '회전 시 정확한 처리를 위해 Sinc Interpolation을 사용합니다.',
  12
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '5e3367fe-e706-466e-8940-e24f76c950bc',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  'Affine Transformation 이후 적용할 수 있는 보간법을 모두 고르세요.',
  'multiple_choice',
  '"[\\"Nearest Neighbor\\",\\"Bilinear\\",\\"Bicubic\\",\\"Sinc Interpolation\\",\\"Gamma Correction\\"]"',
  '"[0,1,2,3]"',
  4,
  'Affine 변환 후 보간법으로 Nearest Neighbor, Bilinear, Bicubic, Sinc Interpolation을 사용할 수 있습니다.',
  13
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '09a6dadc-9518-4821-a88b-ef62fd4d4c5f',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  '다음 중 Affine Transformation의 수학적 표현으로 올바른 것은 무엇입니까?',
  'single_choice',
  '"[\\"$$ x'' = ax + by + c, \\\\\\\\\\\\\\\\ y'' = dx + ey + f $$\\",\\"$$ x'' = x^2 + y^2, \\\\\\\\\\\\\\\\ y'' = xy $$\\",\\"$$ x'' = \\\\\\\\sin(x) + y, \\\\\\\\\\\\\\\\ y'' = x + \\\\\\\\cos(y) $$\\",\\"$$ x'' = x \\\\\\\\times y, \\\\\\\\\\\\\\\\ y'' = y \\\\\\\\times x $$\\"]"',
  '"0"',
  4,
  'Affine 변환은 선형 변환과 이동의 결합으로, $$ x'' = ax + by + c, \\\\ y'' = dx + ey + f $$ 형태로 표현됩니다.',
  14
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '69d71398-b923-4325-bd76-0059117aa04a',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  'Affine Transformation은 Perspective Transformation보다 단순하며 계산 비용이 낮다.',
  'true_false',
  NULL,
  '"true"',
  4,
  'Affine 변환은 Perspective 변환보다 구조가 단순하며 계산 비용이 낮습니다.',
  15
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '9869380c-919a-48dd-bd7f-10fd1a6537ef',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  'Affine Transformation에서 변환 행렬의 크기는 몇 x 몇 입니까?',
  'short_answer',
  NULL,
  '"\\"2x3\\""',
  4,
  'Affine 변환 행렬은 2x3 크기의 행렬로 표현됩니다.',
  16
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '2529d585-7323-4fc1-a7ce-5c4a3b751747',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  'Affine Transformation의 행렬 표현에서 선형 변환 부분은 몇 x 몇 행렬입니까?',
  'single_choice',
  '"[\\"2x2\\",\\"3x3\\",\\"2x3\\",\\"3x2\\"]"',
  '"0"',
  4,
  'Affine 변환의 선형 변환 부분은 2x2 행렬입니다.',
  17
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '58dae092-dd02-4004-8b7c-fcfeb0b48ae6',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  'Affine Transformation은 영상을 뒤틀거나 비스듬히 이동시키는 Shear 변환도 포함한다.',
  'true_false',
  NULL,
  '"true"',
  4,
  'Affine 변환에는 Shear 변환이 포함됩니다.',
  18
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '46ee029e-5a0a-4cb8-86bb-77780a4189a6',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  '영상처리에서 Bilinear 보간법은 몇 개의 주변 픽셀을 사용합니까?',
  'short_answer',
  NULL,
  '"\\"4\\""',
  4,
  'Bilinear 보간법은 주변 4개의 픽셀을 사용하여 보간합니다.',
  19
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '948f3b02-8f34-4aea-b95a-a9e81b53d258',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  '영상처리에서 Bicubic 보간법은 몇 개의 주변 픽셀을 사용합니까?',
  'short_answer',
  NULL,
  '"\\"16\\""',
  4,
  'Bicubic 보간법은 주변 16개의 픽셀을 사용하여 보간합니다.',
  20
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '9b9733b6-7685-47d1-9927-107117f057d3',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  '다음 중 기하학적 변환의 주요 목적을 모두 고르세요.',
  'multiple_choice',
  '"[\\"영상의 크기 변경\\",\\"영상의 위치 변경\\",\\"영상의 색상 변경\\",\\"영상의 회전\\",\\"영상의 변형\\"]"',
  '"[0,1,3,4]"',
  4,
  '기하학적 변환의 주요 목적은 크기 변경, 위치 변경, 회전, 변형이며, 색상 변경은 포함되지 않습니다.',
  21
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '18368cb5-d3f0-4bb5-8dc4-9f6ad78a8ad4',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  '기하학적 변환에서 역변환 시 발생하는 문제를 해결하기 위해 주로 사용하는 기법은 무엇입니까?',
  'single_choice',
  '"[\\"Quantization\\",\\"Histogram Equalization\\",\\"Gamma Correction\\",\\"Interpolation\\"]"',
  '"3"',
  4,
  '역변환 시 부정확한 픽셀 위치가 발생하므로 Interpolation 기법을 사용하여 해결합니다.',
  22
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '653a3a0c-edc6-4af8-9b1c-527850c39633',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
  'Affine Transformation 이후 역변환 없이도 영상의 위치가 원상복귀된다.',
  'true_false',
  NULL,
  '"false"',
  4,
  'Affine 변환 이후 원상복귀를 위해서는 반드시 역변환이 필요합니다.',
  23
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '5c43899c-8690-46e3-a84c-724dd4dc12c6',
  'edc44d2b-2984-4097-8038-189c255ecc8f',
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
  'b1ea1df8-35be-4921-8ae9-c348f6873659',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  'HSI 색상 모델에서 ''H''는 무엇을 의미합니까?',
  'single_choice',
  '"[\\"Hue\\",\\"Highlight\\",\\"Height\\",\\"Heat\\"]"',
  '"0"',
  4,
  '''H''는 Hue(색상)를 의미하며 색상의 주파수를 나타냅니다.',
  0
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '60bce44b-e45f-435f-84d2-3af1082a7cad',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  '다음 중 인간의 색 지각을 설명하는 요소가 아닌 것은 무엇입니까?',
  'single_choice',
  '"[\\"Hue\\",\\"Saturation\\",\\"Intensity\\",\\"Transparency\\"]"',
  '"3"',
  4,
  'Transparency는 색 지각 요소가 아니며, 색 지각은 Hue, Saturation, Intensity로 설명됩니다.',
  1
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'a2d4d89e-db22-4e6f-b447-a0bffafb829d',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  'CIE 1931 XYZ 색공간은 색의 표준 표현을 제공한다.',
  'true_false',
  NULL,
  '"true"',
  4,
  'CIE 1931 XYZ 색공간은 색을 표준적으로 표현하기 위해 사용되는 국제 표준입니다.',
  2
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'b2d16f1a-818b-4668-ba2f-759e2da700d7',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  'HSI 색 모델에서 ''S''는 무엇을 의미합니까?',
  'short_answer',
  NULL,
  '"\\"Saturation\\""',
  4,
  '''Saturation''은 색의 선명함과 채도를 나타내는 요소입니다.',
  3
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '9172cbab-ba9e-4f05-bb1e-8dfa09913543',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  'HSI 색 모델에서 ''I''는 무엇을 의미합니까?',
  'short_answer',
  NULL,
  '"\\"Intensity\\""',
  4,
  '''Intensity''는 색의 밝기, 명도를 의미합니다.',
  4
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'b1cbcf79-f49b-4431-a266-6df5e72f436e',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  '다음 중 CIE XYZ 색 공간에서 z 성분은 어떻게 정의됩니까?',
  'single_choice',
  '"[\\"z = x + y\\",\\"z = 1 - x - y\\",\\"z = y - x\\",\\"z = x - y\\"]"',
  '"1"',
  4,
  'CIE XYZ 색 공간에서는 z = 1 - x - y로 정의됩니다.',
  5
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '072ceef2-ce27-4c98-b2bd-f6468fafa149',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  'RGB 색상 모델은 가산 색상 모델이다.',
  'true_false',
  NULL,
  '"true"',
  4,
  'RGB는 빛을 섞어 색을 표현하는 가산 색상 모델입니다.',
  6
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '1a7bea7f-c8b4-4110-a3a7-8ece262c0040',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  'CMY 색상 모델은 감산 색상 모델이다.',
  'true_false',
  NULL,
  '"true"',
  4,
  'CMY는 인쇄 등에서 사용하는 감산 색상 모델입니다.',
  7
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'a9ae2196-35a2-4641-84d8-0803bb5d7f72',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  '빨강, 녹색, 파랑의 색을 합치면 어떤 색이 됩니까?',
  'short_answer',
  NULL,
  '"\\"흰색\\""',
  4,
  'RGB의 모든 색을 합치면 흰색(White)이 됩니다.',
  8
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '5eb0a298-6a90-46d4-a244-f892c38fca82',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  'CMY 색상 모델에서 Cyan은 어떤 RGB 색상의 조합으로 표현됩니까?',
  'short_answer',
  NULL,
  '"\\"Green + Blue\\""',
  4,
  'CMY에서 Cyan은 Green과 Blue의 결합으로 표현됩니다.',
  9
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '45f9b3fc-58e6-4415-80fa-05d2198cec2d',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  'HSI 색 모델에서 Hue는 무엇을 나타냅니까?',
  'single_choice',
  '"[\\"색의 강도\\",\\"색의 밝기\\",\\"주 색상\\",\\"투명도\\"]"',
  '"2"',
  4,
  'Hue는 색상의 종류(주 색상, 색상환에서의 위치)를 나타냅니다.',
  10
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '2d4c6bd7-8c9e-4877-b6b5-29c3df2840ee',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  '다음 중 HSI 모델의 구성 요소를 모두 고르세요.',
  'multiple_choice',
  '"[\\"Hue\\",\\"Saturation\\",\\"Intensity\\",\\"Transparency\\",\\"Value\\"]"',
  '"[0,1,2]"',
  4,
  'HSI 모델의 구성 요소는 Hue, Saturation, Intensity입니다.',
  11
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'dfb0c724-08aa-48bf-97fb-0c9010d78fbb',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  '색도(Chromaticity)는 Hue와 Saturation으로 결정된다.',
  'true_false',
  NULL,
  '"true"',
  4,
  '색도는 색상의 순수한 속성으로 Hue와 Saturation의 조합으로 표현됩니다.',
  12
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '14456e41-04f1-4474-aa30-ebea7f7e368d',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  'RGB 모델에서 G는 어떤 색을 의미합니까?',
  'short_answer',
  NULL,
  '"\\"Green\\""',
  4,
  '''G''는 Green(녹색)을 의미합니다.',
  13
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '917a4878-e458-4952-8d79-8e959d4471b9',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  'RGB 모델에서 B는 어떤 색을 의미합니까?',
  'short_answer',
  NULL,
  '"\\"Blue\\""',
  4,
  '''B''는 Blue(파랑)를 의미합니다.',
  14
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '74307ed5-7680-438f-8a2b-675ae4fa22dd',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  '색의 밝기를 나타내는 요소는 무엇입니까?',
  'single_choice',
  '"[\\"Hue\\",\\"Saturation\\",\\"Intensity\\",\\"Chroma\\"]"',
  '"2"',
  4,
  'Intensity는 색의 밝기(명도)를 나타냅니다.',
  15
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'e671a9b7-6332-44ea-b444-a1e21459d34b',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  '색의 선명도를 나타내는 요소는 무엇입니까?',
  'single_choice',
  '"[\\"Hue\\",\\"Saturation\\",\\"Intensity\\",\\"Brightness\\"]"',
  '"1"',
  4,
  'Saturation은 색의 선명도, 채도를 나타냅니다.',
  16
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'c00038a0-59e5-49ab-acbe-29180c59c03c',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  'Brightness는 Intensity와 동일한 개념이다.',
  'true_false',
  NULL,
  '"true"',
  4,
  'Brightness와 Intensity는 실질적으로 유사하게 사용됩니다.',
  17
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'f4fdcf28-9df7-4f13-bd9a-5666fd7f3f71',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  'CIE 색공간의 표준 이름을 적으세요.',
  'short_answer',
  NULL,
  '"\\"CIE 1931 XYZ\\""',
  4,
  'CIE 색공간은 CIE 1931 XYZ 색공간이 표준입니다.',
  18
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '4fad2942-084e-48a9-a099-45c4b127f17e',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  '색상(Hue)을 한글로 표현하면 무엇입니까?',
  'short_answer',
  NULL,
  '"\\"색상\\""',
  4,
  'Hue는 ''색상''으로 번역됩니다.',
  19
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '97be1850-f778-4ce9-b1ff-1de1878f8e21',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  '다음 중 색상 표현에 있어 가산 혼합 방식이 사용되는 것은 무엇입니까?',
  'single_choice',
  '"[\\"인쇄\\",\\"디스플레이\\",\\"염색\\",\\"페인트\\"]"',
  '"1"',
  4,
  '디스플레이는 RGB의 가산 혼합 방식을 사용합니다.',
  20
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'da12fa5f-5a0a-4b7b-aa9b-23975ce44ed5',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  '다음 중 CIE 색공간의 특징을 모두 고르세요.',
  'multiple_choice',
  '"[\\"표준 색상 표현\\",\\"x, y, z 좌표 사용\\",\\"모니터 교정\\",\\"조명 색상 기준 제공\\"]"',
  '"[0,1,3]"',
  4,
  'CIE 색공간은 표준 색상 표현, x, y, z 좌표 사용, 조명 색상 기준 제공의 특징이 있습니다.',
  21
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '50159cdb-e3ce-4475-81d6-2a74bfd992ce',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  '인간의 시각은 주관적인 색 경험을 포함한다.',
  'true_false',
  NULL,
  '"true"',
  4,
  '인간의 시각은 주관적인 색 경험을 기반으로 하며, HSI 모델의 기초가 됩니다.',
  22
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'a78907b5-a7f1-471a-9406-2cf63e6ca223',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  '인쇄에서 사용하는 색상 모델은 무엇입니까?',
  'short_answer',
  NULL,
  '"\\"CMY\\""',
  4,
  '인쇄에서는 CMY(또는 CMYK) 모델을 사용합니다.',
  23
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '899e2352-9aa2-41eb-b308-59e8207fdd44',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  '가산 혼합 방식에서 가장 밝은 색은 무엇입니까?',
  'short_answer',
  NULL,
  '"\\"흰색\\""',
  4,
  '가산 혼합 방식에서 모든 색이 합쳐지면 흰색이 됩니다.',
  24
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'e2469d2e-4265-4838-8ef9-1e7b15e4242a',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  '다음 중 색채 모델이 아닌 것은 무엇입니까?',
  'single_choice',
  '"[\\"RGB\\",\\"CMY\\",\\"HSI\\",\\"FFT\\"]"',
  '"3"',
  4,
  'FFT는 색채 모델이 아니라 주파수 변환 방법입니다.',
  25
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '770ebd78-be9a-4d87-a03e-4f0fc65ab81e',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  'HSI 모델은 인간의 주관적 색 경험을 표현하기 위해 만들어졌다.',
  'true_false',
  NULL,
  '"true"',
  4,
  'HSI 모델은 인간이 색을 인식하는 방식을 표현하기 위해 만들어졌습니다.',
  26
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '795daa43-8093-4f55-ba02-ea7dd40c048c',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  'Saturation을 한글로 표현하면 무엇입니까?',
  'short_answer',
  NULL,
  '"\\"채도\\""',
  4,
  'Saturation은 ''채도''로 번역됩니다.',
  27
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'a1189e54-5f5a-4c44-b068-b9f8454e95db',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
  'Intensity를 한글로 표현하면 무엇입니까?',
  'short_answer',
  NULL,
  '"\\"명도\\""',
  4,
  'Intensity는 ''명도''로 번역됩니다.',
  28
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'd5a7b76d-7554-48c6-98a9-8d282e33bef5',
  'c7a12ad0-57ef-4bb4-9690-feb72bc34da2',
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
  'f3a2d4f2-6b01-4fe3-95ee-4544885b58a7',
  '183e7467-b3ee-40f2-9047-284e09092b0c',
  'What is 2 + 2?',
  'single_choice',
  '"[\\"3\\",\\"4\\",\\"5\\",\\"6\\"]"',
  '"1"',
  10,
  '2 + 2 = 4',
  0
);

INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  '7188048b-f0c1-450b-a979-c52058ebef1c',
  '183e7467-b3ee-40f2-9047-284e09092b0c',
  'The Earth is round.',
  'true_false',
  NULL,
  '"true"',
  10,
  'The Earth is approximately spherical.',
  1
);

-- Problems for Debug Test (1 problems)
INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (
  'b89a6684-c0e0-4e3b-8143-6763449de3d2',
  '246b8b0e-0632-4466-b079-f8dd7c3a1053',
  'Test question?',
  'single_choice',
  '"[\\"A\\",\\"B\\"]"',
  '"0"',
  10,
  'Test explanation',
  0
);

-- Migration completed
SELECT 'Data migration completed' as status;
