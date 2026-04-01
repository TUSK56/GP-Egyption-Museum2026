import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// --- هنا تحط الداتا بتاعتك اللي عاوزه يبحث جواها ---
const MY_PRIVATE_DATA = `
1. الملك توت عنخ آمون توفي في سن الـ 19 وقبره اكتشف عام 1922.
2. الهرم الأكبر بني للملك خوفو واستغرق بناؤه حوالي 20 عاماً.
3. قناع نفرتيتي مصنوع من الحجر الجيري المغطى بالجص.
`;

export async function POST(req) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('gemini-1.5-flash'), // تأكد من وجود الـ API Key
    system: `أنت خبير آثار مصري ملقب بـ "الرائي الملكي". 
             لديك صلاحية الوصول لبيانات خاصة وهي: ${MY_PRIVATE_DATA}. 
             استخدم هذه البيانات للإجابة، وإذا لم تجد المعلومة استخدم معرفتك العامة بالحضارة المصرية.`,
    messages,
  });

  return result.toDataStreamResponse();
}