
// Calculator loader function
function loadCalculator(calc) {
    // Show calculator container and set up elements
    const calculatorContainer = document.getElementById('calculator-container');
    calculatorContainer.style.display = 'block';

    const title = document.getElementById('calculator-title');
    const form = document.getElementById('calculator-form');
    const result = document.getElementById('result');
    const customText = document.getElementById('custom-text');

    // Clear previous content
    form.innerHTML = '';
    result.style.display = 'none';

    // Load the appropriate calculator
    if (calc === 'Percent Change') {
        title.textContent = 'Percent Change Calculator';
        form.innerHTML = `
            <div class="input-group">
                <label for="initialValue">Previous Value:</label>
                <input type="number" id="initialValue" step="any" required>
            </div>
            <div class="input-group">
                <label for="finalValue">Current Value:</label>
                <input type="number" id="finalValue" step="any" required>
            </div>
            <button type="submit">Calculate</button>
        `;
        form.onsubmit = calculatePercentChange;
        customText.innerHTML = `
            Use this calculator to determine performance increase or decrease relative to a starting point.<br>
            <br> 
            This is not the same as Percent Difference.<br>
            In percentage change, the point of reference is one of the numbers in question; while in percent difference, 
            you take the average of these two numbers as the point of reference. 
            <br>
    
            Use this formula in Excel or Google Sheets for your reporting needs:
            <pre><code>=((Current Value - Previous Value) / Previous Value) * 100</code></pre>
            <br>

            <p> Here is the mathemetical formula, where V2 is Current Value and V1 is Previous Value. </p>
            <br>
            $$\\frac{(V_2 - V_1)}{|V_1|} \\times 100$$
        `;
        // Trigger MathJax to render LaTeX
        MathJax.typeset();

    } else if (calc === 'ROAS') { /* ROAS CALC */
        title.textContent = 'ROAS Calculator';
        form.innerHTML = `
        <div class="input-group">
            <label for="revenue">Revenue:</label>
            <input type="number" id="revenue" step="any" required>
        </div>
        <div class="input-group">
            <label for="adSpend">Spend:</label>
            <input type="number" id="adSpend" step="any" required>
        </div>
        <button type="submit">Calculate ROAS</button>
    `;
        form.onsubmit = calculateROAS;
        customText.innerHTML = `
            Use this calculator to determine how effective the campaign is at generating revenue .<br>
            <br> 
            <li>Any value <100% means the campaign is spending more money than it's generating. </li>
            <br>
           <li> 100% ROAS is the breakeven point, but still considered a less than ideal outcome.</li>
            <br> 
           <li> The ideal ROAS value depends on the advertiser's product, goals, historical benchmarks, and media channel. </li>
            <li>A good rule of thumb is to aim for a minimum of 200% ROAS, or a 2x return. </li>
        
            <p>Use this formula in Excel or Google Sheets for your reporting needs:</p>
           <p> Find ROAS Percentage: </p>
            <pre><code>=(Revenue/Spend)*100</code></pre>
            <br>
            Find X Return:
            <pre><code>=(Revenue/Spend)</code></pre>
            <br>
            <p> Here is the mathemetical formula for calculating ROAS percentage: </p>
            <br>
            $$\\frac{Revenue}{Spend} \\times 100$$
        `;
        // Trigger MathJax to render LaTeX
        MathJax.typeset();


    } else if (calc === 'CPA') { /* CPA CALC */
        title.textContent = 'CPA Calculator';
        form.innerHTML = `
        <div class="input-group">
            <label for="conversions">Conversions:</label>
            <input type="number" id="conversions" step="any" required>
        </div>
        <div class="input-group">
            <label for="adSpend">Ad Spend:</label>
            <input type="number" id="adSpend" step="any" required>
        </div>
        <button type="submit">Calculate CPA</button>
    `;
        form.onsubmit = calculateCPA;
        customText.innerHTML = `
            Cost per Acquisition (or Action) represents the total cost to aquire new sales or leads through a specific channel.
            <br>
            Calculated by dividing spend by number of conversions, CPA helps assess efficiency and profitability.

            <p>Use this formula in Excel or Google Sheets for your reporting needs:</p>
            <pre><code>=(Spend / Conversions)</code></pre>
            <p>Here is the mathematical formula for calculating CPA:</p>
            <br>
             $$\\text{CPA} = \\frac{Spend}{Conversions}$$
        
        
        `;
        MathJax.typeset();

    } else if (calc === 'CPM') { /* CPM CALC */
        title.textContent = 'CPM Calculator';
        form.innerHTML = `
            <div class="input-group">
                <label for="cpm">CPM:</label>
                <input type="number" id="cpm" step="any">
            </div>
            <div class="input-group">
                <label for="impressions">Impressions:</label>
                <input type="number" id="impressions" step="any">
            </div>
            <div class="input-group">
                <label for="spend">Spend:</label>
                <input type="number" id="spend" step="any">
            </div>
            <button type="submit">Calculate</button>
        `;
        form.onsubmit = calculateCPM;
        customText.innerHTML = `
            Provide any two values to solve for the desired metric.
            <p> Use this formula in Excel or Google Sheets for your reporting needs: </p>
            <pre><code>CPM=(Spend / Impressions) * 1000</code></pre>
            <pre><code>Impressions=Spend / (CPM * 1000)</code></pre>
            <pre><code>Spend=CPM * (Impressions / 1000)</code></pre>
            <br>
            $$CPM = \\frac{Spend}{Impressions} \\times 1000$$
            <br>
            $$\\text{Impressions} = \\left(\\frac{Spend}{CPM}\\right) \\times 1000$$
            <br>
            $$\\text{Spend} = CPM \\times \\frac{Impressions}{1000}$$
        `;
        // Trigger MathJax to render LaTeX
        MathJax.typeset();


    } else if (calc === 'CPC') { /* CPC CALC */
        title.textContent = 'CPC Calculator';
        form.innerHTML = `
        <div class="input-group">
            <label for="spend">Spend:</label>
            <input type="number" id="spend" step="any" required>
        </div>
        <div class="input-group">
            <label for="clicks">Clicks:</label>
            <input type="number" id="clicks" step="any" required>
        </div>
        <button type="submit">Calculate CPC</button>
    `;
        form.onsubmit = calculateCPC;
        customText.innerHTML = 'Calculate the cost per click based on total spend and clicks.';

    } else if (calc === 'CTR') { /* CTR CALC */
        title.textContent = 'CTR Calculator';
        form.innerHTML = `
        <div class="input-group">
            <label for="clicks">Clicks:</label>
            <input type="number" id="clicks" step="any" required>
        </div>
        <div class="input-group">
            <label for="impressions">Impressions:</label>
            <input type="number" id="impressions" step="any" required>
        </div>
        <button type="submit">Calculate CTR</button>
    `;
        form.onsubmit = calculateCTR;
        customText.innerHTML = 'Calculate the click-through rate (CTR) based on clicks and impressions.';

    } else if (calc === 'MarginMarkup') { /* MUMAR CALC */
        title.textContent = 'Margin & Markup Calculator';
        form.innerHTML = `
        <div class="input-group">
            <label for="mediaSpend">Media Spend:</label>
            <input type="number" id="mediaSpend" step="any" >
        </div>
        <div class="input-group">
            <label for="margin">Margin (%):</label>
            <input type="number" id="margin" step="any" >
        </div>
        <div class="input-group">
            <label for="markup">Markup (%):</label>
            <input type="number" id="markup" step="any" >
        </div>
        <div class="input-group">
            <label for="finalCost">Final Cost:</label>
            <input type="number" id="finalCost" step="any" >
        </div>
        <button type="submit">Calculate</button>
    `;
        form.onsubmit = calculateMarginMarkup;
        customText.innerHTML =
            '<b>Markup and margin are similar concepts:</b><br>' +
            'The <b>Margin</b> is the percentage of the Final Cost that becomes profit;<br>' +
            '<br>' +
            'The <b>Markup</b> is the percentage increase of the Media Spend that brings us to the Final Cost.';

    } else if (calc === 'calculatePercentAddition') { /* % ADD CALC */
        title.textContent = 'Add Percentage Calculator';
        form.innerHTML = `
            <div class="input-group">
                <label for="baseValue">Base Number:</label>
                <input type="number" id="baseValue" step="any" required>
            </div>
            <div class="input-group">
                <label for="percentValue">Percentage to Add:</label>
                <input type="number" id="percentValue" step="any" required>
            </div>
            <button type="submit">Calculate</button>
        `;
        form.onsubmit = calculatePercentAddition;
        customText.innerHTML = 'Use this calculator to add a specific percentage to a number.';

    } else if (calc === 'calculatePercentSubtraction') { /* % SUBTRACT CALC */
        title.textContent = 'Subtract Percentage Calculator';
        form.innerHTML = `
            <div class="input-group">
                <label for="baseValue">Base Number:</label>
                <input type="number" id="baseValue" step="any" required>
            </div>
            <div class="input-group">
                <label for="percentValue">Percentage to Subtract:</label>
                <input type="number" id="percentValue" step="any" required>
            </div>
            <button type="submit">Calculate</button>
        `;
        form.onsubmit = calculatePercentSubtraction;
        customText.innerHTML = 'Use this calculator to subtract a specific percentage from a number.';

    } else if (calc === 'calculateIndex') { /* % INDEX CALC */
        title.textContent = 'Index Calculator';
        form.innerHTML = `
            <div class="input-group">
                <label for="actualValue">Actual Value:</label>
                <input type="number" id="actualValue" step="any" required>
            </div>
            <div class="input-group">
                <label for="plannedValue">Planned Value:</label>
                <input type="number" id="plannedValue" step="any" required>
            </div>
            <button type="submit">Calculate Index</button>
        `;
        form.onsubmit = calculateIndex;
        customText.innerHTML = `
            Index is a comparative metric that expresses how a value compares to a baseline or benchmark — often normalized to 100. 
            <br>
            Index can be interpreted as a percentage above or below a benchmark. 
            <br>  
            <br> 
            <li> 100 = Exactly on par with expected benchmark </li> 
             <br>
             <li> >100 = Above expected benchmark (often signals positive results) </li>     
             <br>
             <li> <100 = Below expected benchmark </li> 
             <br>
             <li> An index of 125 is equal to saying "+25% above benchmark". </li>
             <br>
             <li> Similarily, an index of 70 is equal to saying "-30% below benchmark". </li>                                        
                `




            ;

        MathJax.typeset();

    } else if (calc === 'VCR') { /* VCR CALC */
        title.textContent = 'Video Completion Rate Calculator';
        form.innerHTML = `
        <div class="input-group">
            <label for="videostart">Video Starts:</label>
            <input type="number" id="videostart" step="any" required>
        </div>
        <div class="input-group">
            <label for="videocomplete">Video Completes:</label>
            <input type="number" id="videocomplete" step="any" required>
        </div>
        <button type="submit">Calculate VCR</button>
    `;
        form.onsubmit = calculateVCR;
        customText.innerHTML = `
            Video Completion Rate represents the percentage of viewers who watched a video to 100% completion.
            <br>
            Calculated by dividing spend by number of video starts (or impressions) by video completes, VCR helps determine video relevancy and interest among the target audience.

            <p>Use this formula in Excel or Google Sheets for your reporting needs:</p>
            <pre><code>=(Video Starts / Video Completes) * 100</code></pre>
            <p>Here is the mathematical formula for calculating VCR. Multiply answer by 100 to convert to a percentage.</p>
            <br>
             $$\\text{VCR} = \\frac{Starts}{Completes}$$
        
        
        `;
        MathJax.typeset();

    } else if (calc === 'LTR') { /* LTR CALC */
        title.textContent = 'Listen Through Rate Calculator';
        form.innerHTML = `
        <div class="input-group">
            <label for="audiostart">Audio Starts:</label>
            <input type="number" id="audiostart" step="any" required>
        </div>
        <div class="input-group">
            <label for="audiocomplete">Audio Completes:</label>
            <input type="number" id="audiocomplete" step="any" required>
        </div>
        <button type="submit">Calculate LTR</button>
    `;
        form.onsubmit = calculateLTR;
        customText.innerHTML = `
            Listen Through Rate represents the percentage of the rate that an audio placement was heard to 100% completion. Similar to VCR.
            <br>
            Calculated by dividing spend by number of audio starts (or impressions) by audio completes, LTR helps determine audio ad relevancy and interest among the target audience.

            <p>Use this formula in Excel or Google Sheets for your reporting needs:</p>
            <pre><code>=(Audio Starts / Audio Completes) * 100</code></pre>
            <p>Here is the mathematical formula for calculating LTR. Multiply answer by 100 to convert to a percentage.</p>
            <br>
             $$\\text{LTR} = \\frac{Starts}{Completes}$$
        
        
        `;
        MathJax.typeset();
    } else if (calc === 'View Rate') { /* LTR CALC */
        title.textContent = 'View Rate Calculator';
        form.innerHTML = `
        <div class="input-group">
            <label for="totalview">Total Views:</label>
            <input type="number" id="totalview" step="any" required>
        </div>
        <div class="input-group">
            <label for="paidview">Paid Views:</label>
            <input type="number" id="paidview" step="any" required>
        </div>
        <button type="submit">Calculate VR</button>
    `;
        form.onsubmit = calculateVR;
        customText.innerHTML = `
            Largely used for YouTube campaigns, View Rate is a percentage showing the number of times the video ad is <b>viewed</b> <i>relative to the total number of times the video is shown.</i>
            
            <p> YouTube (Google) defines a View in a couple ways: </p>
            <li> When a user watches the video ad in an autoplay state for at least 10 seconds </li>
            <li> When a user watches the entire video ad if it is <i>less</i> than 10 seconds long </li>
            <li> When a user clicks on the ad thumbnail, regardless of the video duration viewed </li>

            <p>VR can be thought of as the video version of CTR, as it tracks the amount of "engagement" a video is receiving. <br>
            Benchmark values can fluctuate based on vertical/industry, but generally a minimum desired VR is 8-10%. </p>
            <p>Use this formula in Excel or Google Sheets for your reporting needs:</p>
            <pre><code>=(Paid Views / Total Views) * 100</code></pre>
            <p>Here is the mathematical formula for calculating VR. Multiply answer by 100 to convert to a percentage.</p>
            <br>
             $$\\text{VR} = \\frac{Paid Views}{Total Views}$$
        
        
        `;
        MathJax.typeset();
    } else if (calc === 'TargetBid') {
        title.textContent = 'Target Bid Calculator';
        form.innerHTML = `
        <div class="input-group">
            <label for="maxCPM">Max CPM ($):</label>
            <input type="number" id="maxCPM" step="any">
        </div>
        <div class="input-group">
            <label for="margin">Margin (%):</label>
            <input type="number" id="margin" step="any">
        </div>
        <div class="input-group">
            <label for="tbid">Target Bid ($):</label>
            <input type="number" id="tbid" step="any">
        </div>
        <button type="submit">Calculate</button>
    `;
        form.onsubmit = calculateTargetBid;
        customText.innerHTML = `
        Enter any two values to calculate the third.<br><br>
        <li><b>Target Bid</b> = Max CPM / (1 + (Margin / 100))</li>
        <li><b>Max CPM</b> = Target Bid × (1 + (Margin / 100))</li>
        <li><b>Margin</b> = ((Max CPM / Target Bid) - 1) × 100</li>
    `;
    }

}


// Calculation functions
function calculatePercentChange(event) {
    event.preventDefault();
    const initialValue = parseFloat(document.getElementById('initialValue').value);
    const finalValue = parseFloat(document.getElementById('finalValue').value);
    const result = document.getElementById('result');

    if (isNaN(initialValue) || isNaN(finalValue) || initialValue === 0) {
        result.textContent = 'Please enter valid numbers. The initial value cannot be zero.';
    } else {
        // Calculate percent change
        const percentChange = ((finalValue - initialValue) / initialValue) * 100;

        // Calculate multiplier change
        const multiplierChange = finalValue / initialValue;
        const multiplierText = multiplierChange >= 1 ? `${multiplierChange.toFixed(2)}x` : `${(1 / multiplierChange).toFixed(2)}x (decreased)`;

        // Display results
        result.innerHTML = `Percent Change: ${percentChange.toFixed(2)}% <br> Multiplier Change: ${multiplierText}`;
    }

    result.style.display = 'block';
}

function calculateROAS(event) {
    event.preventDefault();
    const revenue = parseFloat(document.getElementById('revenue').value);
    const adSpend = parseFloat(document.getElementById('adSpend').value);
    const result = document.getElementById('result');

    if (isNaN(revenue) || isNaN(adSpend) || adSpend === 0) {
        result.textContent = 'Please enter valid numbers.';
    } else {
        // Calculate ROAS as a percentage
        const roasPercentage = (revenue / adSpend) * 100;

        // Calculate the return multiplier
        const returnMultiplier = revenue / adSpend;

        // Display each line separately
        result.innerHTML = `ROAS: ${roasPercentage.toFixed(2)}%<br>${returnMultiplier.toFixed(2)}x Return`;
    }

    result.style.display = 'block';
}
function calculateCPA(event) {
    event.preventDefault();
    const conversions = parseFloat(document.getElementById('conversions').value);
    const adSpend = parseFloat(document.getElementById('adSpend').value);
    const result = document.getElementById('result');

    if (isNaN(conversions) || isNaN(adSpend) || conversions === 0) {
        result.textContent = 'Please enter valid numbers.';
    } else {
        const cpa = adSpend / conversions;
        result.textContent = `CPA: $${cpa.toFixed(2)}`;
    }

    result.style.display = 'block';
}

function calculateVCR(event) {
    event.preventDefault();
    const videostart = parseFloat(document.getElementById('videostart').value);
    const videocomplete = parseFloat(document.getElementById('videocomplete').value);
    const result = document.getElementById('result');

    if (isNaN(videostart) || isNaN(videocomplete) || videostart === 0) {
        result.textContent = 'Please enter valid numbers.';
    } else {
        const vcr = (videocomplete / videostart) * 100;
        result.textContent = `VCR: ${vcr.toFixed(0)}%`;
    }

    result.style.display = 'block';
}

function calculateCPM(event) {
    event.preventDefault();

    const cpm = parseFloat(document.getElementById('cpm').value);
    const impressions = parseFloat(document.getElementById('impressions').value);
    const spend = parseFloat(document.getElementById('spend').value);
    const result = document.getElementById('result');

    const isCPM = !isNaN(cpm);
    const isImpressions = !isNaN(impressions);
    const isSpend = !isNaN(spend);

    const count = [isCPM, isImpressions, isSpend].filter(Boolean).length;

    if (count !== 2) {
        result.textContent = 'Please provide exactly two values to solve for the third.';
        result.style.display = 'block';
        return;
    }

    if (!isCPM) {
        const calculatedCPM = (spend / impressions) * 1000;
        result.innerHTML = `CPM: $${calculatedCPM.toFixed(2)}`;
    } else if (!isImpressions) {
        const calculatedImpressions = (spend * 1000) / cpm;
        result.innerHTML = `Impressions: ${calculatedImpressions.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    } else if (!isSpend) {
        const calculatedSpend = (cpm * impressions) / 1000;
        result.innerHTML = `Spend: $${calculatedSpend.toFixed(2)}`;
    }

    result.style.display = 'block';
}

function calculateCPC(event) {
    event.preventDefault();
    const spend = parseFloat(document.getElementById('spend').value);
    const clicks = parseFloat(document.getElementById('clicks').value);
    const result = document.getElementById('result');

    if (isNaN(spend) || isNaN(clicks) || clicks === 0) {
        result.textContent = 'Please enter valid numbers.';
    } else {
        const cpc = spend / clicks;
        result.textContent = `CPC: $${cpc.toFixed(2)}`;
    }
    result.style.display = 'block';
}

function calculateCTR(event) {
    event.preventDefault();
    const clicks = parseFloat(document.getElementById('clicks').value);
    const impressions = parseFloat(document.getElementById('impressions').value);
    const result = document.getElementById('result');

    if (isNaN(clicks) || isNaN(impressions) || impressions === 0) {
        result.textContent = 'Please enter valid numbers.';
    } else {
        const ctr = (clicks / impressions) * 100;
        result.textContent = `CTR: ${ctr.toFixed(2)}%`;
    }
    result.style.display = 'block';
}

function calculateMarginMarkup(event) {
    event.preventDefault();

    const mediaSpend = parseFloat(document.getElementById('mediaSpend').value);
    const margin = parseFloat(document.getElementById('margin').value) / 100;
    const markup = parseFloat(document.getElementById('markup').value) / 100;
    const finalCost = parseFloat(document.getElementById('finalCost').value);
    const result = document.getElementById('result');

    // Collect the filled inputs
    const inputs = [mediaSpend, margin, markup, finalCost].filter(value => !isNaN(value));

    // Error: Require exactly two or three inputs
    if (inputs.length < 2 || inputs.length > 3) {
        result.innerHTML = 'Error: Please provide exactly two or three valid inputs.';
        result.style.display = 'block';
        return;
    }

    // Calculate the missing values
    if (!isNaN(mediaSpend) && !isNaN(margin)) {
        const calculatedMarkup = (1 / (1 - margin)) - 1;
        const calculatedFinalCost = mediaSpend * (1 + calculatedMarkup);
        result.innerHTML =
            `Final Cost: $${calculatedFinalCost.toFixed(2)}<br>` +
            `Markup: ${(calculatedMarkup * 100).toFixed(2)}%`;

    } else if (!isNaN(mediaSpend) && !isNaN(markup)) {
        const calculatedMargin = 1 - (1 / (1 + markup));
        const calculatedFinalCost = mediaSpend * (1 + markup);
        result.innerHTML =
            `Final Cost: $${calculatedFinalCost.toFixed(2)}<br>` +
            `Margin : ${(calculatedMargin * 100).toFixed(2)}%`;

    } else if (!isNaN(finalCost) && !isNaN(markup)) {
        const calculatedMediaSpend = finalCost / (1 + markup);
        const calculatedMargin = 1 - (1 / (1 + markup));
        result.innerHTML =
            `Media Spend: $${calculatedMediaSpend.toFixed(2)}<br>` +
            `Margin: ${(calculatedMargin * 100).toFixed(2)}%`;
    } else if (!isNaN(finalCost) && !isNaN(margin)) {
        const calculatedMediaSpend = finalCost / (1 + ((1 / (1 - margin)) - 1));
        const calculatedMarkup = (1 / (1 - margin)) - 1;
        result.innerHTML =
            `Media Spend: $${calculatedMediaSpend.toFixed(2)}<br>` +
            `Markup: ${(calculatedMarkup * 100).toFixed(2)}%`;
    } else {
        result.innerHTML = 'Error: Unable to calculate the missing values. Please try again.';
    }

    result.style.display = 'block';
}

function calculatePercentAddition(event) {
    event.preventDefault();
    const baseValue = parseFloat(document.getElementById('baseValue').value);
    const percentValue = parseFloat(document.getElementById('percentValue').value);
    const result = document.getElementById('result');

    if (isNaN(baseValue) || isNaN(percentValue)) {
        result.textContent = 'Please enter valid numbers.';
    } else {
        const addedAmount = (baseValue * percentValue) / 100;
        const finalValue = baseValue + addedAmount;
        result.textContent = `Result: ${finalValue.toFixed(2)}`;
    }
    result.style.display = 'block';
}
function calculatePercentSubtraction(event) {
    event.preventDefault();
    const baseValue = parseFloat(document.getElementById('baseValue').value);
    const percentValue = parseFloat(document.getElementById('percentValue').value);
    const result = document.getElementById('result');

    if (isNaN(baseValue) || isNaN(percentValue)) {
        result.textContent = 'Please enter valid numbers.';
    } else {
        const subtractedAmount = (baseValue * percentValue) / 100;
        const finalValue = baseValue - subtractedAmount;
        result.textContent = `Result: ${finalValue.toFixed(2)}`;
    }
    result.style.display = 'block';
}
function calculateIndex(event) {
    event.preventDefault();
    const actualValue = parseFloat(document.getElementById('actualValue').value);
    const plannedValue = parseFloat(document.getElementById('plannedValue').value);
    const result = document.getElementById('result');

    if (isNaN(actualValue) || isNaN(plannedValue) || plannedValue === 0) {
        result.textContent = 'Please enter valid numbers. Planned Value cannot be zero.';
    } else {
        const index = (actualValue / plannedValue) * 100;
        result.textContent = `Index: ${index.toFixed(0)}`;
    }

    result.style.display = 'block';
}

function calculateLTR(event) {
    event.preventDefault();
    const audiostart = parseFloat(document.getElementById('audiostart').value);
    const audiocomplete = parseFloat(document.getElementById('audiocomplete').value);
    const result = document.getElementById('result');

    if (isNaN(audiostart) || isNaN(audiocomplete) || audiostart === 0) {
        result.textContent = 'Please enter valid numbers.';
    } else {
        const ltr = (audiocomplete / audiostart) * 100;
        result.textContent = `LTR: ${ltr.toFixed(0)}%`;
    }

    result.style.display = 'block';
}
function calculateVR(event) {
    event.preventDefault();
    const paidview = parseFloat(document.getElementById('paidview').value);
    const totalview = parseFloat(document.getElementById('totalview').value);
    const result = document.getElementById('result');

    if (isNaN(paidview) || isNaN(totalview) || paidview === 0) {
        result.textContent = 'Please enter valid numbers.';
    } else {
        const ltr = (paidview / totalview) * 100;
        result.textContent = `VR: ${ltr.toFixed(0)}%`;
    }

    result.style.display = 'block';
}
function calculateTargetBid(event) {
    event.preventDefault();

    const maxCPM = parseFloat(document.getElementById('maxCPM').value);
    const margin = parseFloat(document.getElementById('margin').value);
    const tbid = parseFloat(document.getElementById('tbid').value);
    const result = document.getElementById('result');

    const isMaxCPM = !isNaN(maxCPM);
    const isMargin = !isNaN(margin);
    const isTBID = !isNaN(tbid);

    const filled = [isMaxCPM, isMargin, isTBID].filter(Boolean).length;

    if (filled !== 2) {
        result.textContent = 'Please enter exactly two values to solve for the third.';
        result.style.display = 'block';
        return;
    }

    let output = '';
    if (!isTBID) {
        const tbidResult = maxCPM / (1 + (margin / 100));
        output = `Target Bid: $${tbidResult.toFixed(2)}`;
    } else if (!isMaxCPM) {
        const maxCPMResult = tbid * (1 + (margin / 100));
        output = `Max CPM: $${maxCPMResult.toFixed(2)}`;
    } else if (!isMargin && tbid !== 0) {
        const marginResult = ((maxCPM / tbid) - 1) * 100;
        output = `Margin: ${marginResult.toFixed(2)}%`;
    } else {
        output = 'Invalid input.';
    }

    result.innerHTML = output;
    result.style.display = 'block';
}


document.addEventListener('click', function (e) {
    const resultBox = document.getElementById('result');

    if (e.target === resultBox && resultBox.textContent.trim() !== '') {
        const rawText = resultBox.textContent.trim();

        // Extract first number (including decimals, %, $, etc.)
        const match = rawText.match(/[-+]?[0-9]*\.?[0-9]+/);
        const numberOnly = match ? match[0] : '';

        if (numberOnly) {
            navigator.clipboard.writeText(numberOnly).then(() => {
                resultBox.innerHTML = `📋 Copied: ${numberOnly}`;
                setTimeout(() => {
                    resultBox.innerHTML = rawText;
                }, 1200);
            });
        }
    }
});