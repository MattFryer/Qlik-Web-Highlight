<?php
/**
 * @package Qlik_Highlight
 */
	require_once('../../../wp-load.php'); // Needed to be able to call the translation functions
?>
<div id="qlik_highlight_shortcode_popup" style="display:none;">
    <div class="qlik_highlight_shortcode_popup">
        <div class="field-container">
            <div class="label-desc">
                <label for="qlik_highlight_codetype"><?php esc_html_e('Code type', 'qlikview-syntax-highlighter'); ?></label>
            </div>
            <div class="content">
                <select name="codetype" id="qlik_highlight_codetype">
                    <option value="qvs">Qlik Script</option>
                    <option value="exp">Qlik Expression/Measure</option>
                    <option value="sql">SQL</option>
                    <option value="vbscript">VBScript</option>
                    <option value="javascript">JavaScript</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                </select>
            </div>
        </div>

        <div class="buttons">
            <input type="button" class="button-primary" value="<?php esc_html_e('Insert Code Block', 'qlikview-syntax-highlighter'); ?>" onclick="Insert_Container_Qlik_Highlight();"/>
            <a class="button" href="#" onclick="tb_remove(); return false;"><?php esc_html_e('Cancel', 'qlikview-syntax-highlighter'); ?></a>
        </div>
    </div>
</div>