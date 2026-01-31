import { test, expect } from '@playwright/test';

/**
 * Data extracted from your "IT22273208 - Test Cases.xlsx" file.
 * Total scenarios: 35 (24 Positive, 10 Negative, 1 UI)
 */
const testData = [
  { id: 'Pos_Fun_0001', name: 'Simple daily sentence', input: 'mama campus yanavaa', expected: 'මම campus යනවා' },
  { id: 'Pos_Fun_0002', name: 'Greeting question', input: 'oyaata haridha?', expected: 'ඔයාට හරිද?' },
  { id: 'Pos_Fun_0003', name: 'Imperative command', input: 'poddak inna', expected: 'පොඩ්ඩක් ඉන්න' },
  { id: 'Pos_Fun_0004', name: 'Negative sentence', input: 'mata yanna baee', expected: 'මට යන්න බෑ' },
  { id: 'Pos_Fun_0005', name: 'Polite request', input: 'karunaakaralaa kata vahaganna puluvandha?', expected: 'කරුනාකරලා කට වහගන්න පුලුවන්ද?' },
  { id: 'Pos_Fun_0006', name: 'Compound sentence', input: 'api lunch kanna gedhara yamu', expected: 'අපි lunch කන්න ගෙදර යමු' },
  { id: 'Pos_Fun_0007', name: 'Past tense', input: 'mama iiyee class giyaa', expected: 'මම ඊයේ class ගියා' },
  { id: 'Pos_Fun_0008', name: 'Future tense', input: 'api heta meeting ekata yamu', expected: 'අපි හෙට meeting එකට යමු' },
  { id: 'Pos_Fun_0009', name: 'Pronoun variation', input: 'eyaa adha ennee', expected: 'එයා අද එන්නේ' },
  { id: 'Pos_Fun_0010', name: 'Repeated words', input: 'tika tika hodha venavaa', expected: 'ටික ටික හොද වෙනවා ' },
  { id: 'Pos_Fun_0011', name: 'Daily phrase', input: 'mata baya hithenavaa', expected: 'මට බය හිතෙනවා' },
  { id: 'Pos_Fun_0012', name: 'Place name', input: 'api Colombo yanavaa', expected: 'අපි Colombo යනවා' },
  { id: 'Pos_Fun_0013', name: 'Technical term', input: 'Email eka evanna', expected: 'Email එක එවන්න' },
  { id: 'Pos_Fun_0014', name: 'Question sentence', input: 'ethanata yanna', expected: 'එතනට යන්න' },
  { id: 'Pos_Fun_0015', name: 'Informal command', input: 'issarahata yanna', expected: 'ඉස්සරහට යන්න' },
  { id: 'Pos_Fun_0016', name: 'Date format', input: 'adha dhavasa', expected: 'අද දවස' },
  { id: 'Pos_Fun_0017', name: 'Currency format', input: 'Rs. 4500 gevanna thiyenavaa', expected: 'Rs. 4500 ගෙවන්න තියෙනවා' },
  { id: 'Pos_Fun_0018', name: 'Time format', input: '8.00 AM ta enna', expected: '8.00 AM ට එන්න' },
  { id: 'Pos_Fun_0019', name: 'Multiple spaces', input: 'mama inne', expected: 'මම ඉන්නේ' },
  { id: 'Pos_Fun_0020', name: 'Line break input', input: 'api heta enavaa', expected: 'අපි හෙට එනවා' },
  { id: 'Pos_Fun_0021', name: 'Long paragraph', input: 'akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa akkaa', expected: 'අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා අක්කා' },
  { id: 'Pos_Fun_0022', name: 'Request form', input: 'puluvannam mata document eka evanna', expected: 'පුලුවන්නම් මට document එක එවන්න' },
  { id: 'Pos_Fun_0023', name: 'Long paragraph', input: 'adha vahina nisaa traffic thiyenavaa ehema unath api office enavaa kiyala hithan inne', expected: 'අද වහින නිසා traffic තියෙනවා එහෙම උනත් අපි office එනවා කියල හිතන් ඉන්නේ' },
  { id: 'Pos_Fun_0024', name: 'Abbreviation handling', input: 'NIC eka dhenna', expected: 'NIC එක දෙන්න' },

  { id: 'Neg_Fun_0001', name: 'Heavy joined words', input: 'mamagedharainne', expected: 'Incorrect conversion expected' },
  { id: 'Neg_Fun_0002', name: 'Random symbols', input: '### !!!', expected: 'No output' },
  { id: 'Neg_Fun_0003', name: 'Slang overload', input: 'ado bn mokada meka', expected: 'අඩෝ බන් මොකද මේක' },
  { id: 'Neg_Fun_0004', name: 'No vowels', input: 'm gdr ynv', expected: 'Incorrect output' },
  { id: 'Neg_Fun_0005', name: 'Numeric heavy', input: '123456', expected: 'No meaningful output' },
  { id: 'Neg_Fun_0006', name: 'Emoji input', input: '😂😂', expected: 'No output' },
  { id: 'Neg_Fun_0007', name: 'Empty input', input: '', expected: 'No output' },
  { id: 'Neg_Fun_0008', name: 'Broken sentence', input: 'mama enawa nisaa', expected: 'මම එනවා නිසා' },
  { id: 'Neg_Fun_0009', name: 'Mixed casing', input: 'MaMa GeDhArA YaNaVaA', expected: 'මම ගෙදර යනවා' },
  { id: 'Neg_Fun_0010', name: 'English-only input', input: 'Please send the file', expected: 'No Sinhala output expected' },
  { id: 'Neg_UI_0001', name: 'UI reload issue', input: 'man gedhara yanavaa', expected: 'මන් ගෙදර යනවා' }
];

test.describe('IT3040 Assignment: Swift Translator Automation', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the translator and wait for it to load
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  });

  for (const scenario of testData) {
    test(`${scenario.id}: ${scenario.name} | IT22273208`, async ({ page }, testInfo) => {
      // 1. Identify Input and Output fields
      // Based on the site structure, we find the first and last textareas
      const inputArea = page.getByPlaceholder("Input Your Singlish Text Here.");
      const outputArea = page.locator('div.bg-slate-50');

      // 2. Perform actions
      await inputArea.fill(scenario.input);
      
      // 3. Wait for real-time conversion (Brief delay for JS to run)
      await page.waitForTimeout(1000); 

      // 4. Capture Actual Output
      const actualOutput = await outputArea.innerHTML();

      // 5. Log for Excel Reporting
      console.log(`TC ID: ${scenario.id}`);
      console.log(`Actual Output: ${actualOutput}`);

      // 6. Attach to report for easy copying
      testInfo.annotations.push({
        type: 'Actual Output (Sinhala)',
        description: actualOutput
      });

      await expect(outputArea).toHaveText(scenario.expected);

      // // 7. Verify Result (Assertions)
      // // Note: Negative scenarios might fail this assertion, which validates the "Failure"
      // if (scenario.id.startsWith('Pos')) {
        
      // } else {
      //   // For Negative scenarios, we expect some inconsistency or capture the bug
      //   console.warn(`[NEG] ${scenario.id} captured result: ${actualOutput}`);
      // }
    });
  }

  
});