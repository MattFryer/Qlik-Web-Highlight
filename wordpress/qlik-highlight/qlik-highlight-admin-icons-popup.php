<?php
/**
 * @package Qlik_Highlight
 */
	require_once('../../../wp-load.php'); // Needed to be able to call the translation functions
?>
<div id="qlik_icon_shortcode_popup" style="display:none;">
    <div class="qlik_highlight_shortcode_popup">
        <div class="field-container">
            <div class="label-desc">
                <label for="qlik_icon_size"><?php esc_html_e('Icon Size', 'qlikview-syntax-highlighter'); ?></label>
            </div>
            <div class="content">
                <select name="iconsize" id="qlik_icon_size">
                    <option value="">Normal</option>
                    <option value=" qicon-lg">Large</option>
                    <option value=" qicon-2x">Double</option>
                    <option value=" qicon-3x">Triple</option>
                    <option value=" qicon-4x">Quadruple</option>
                    <option value=" qicon-5x">Quintuple</option>
                </select>
            </div>

            <div class="label-desc">
                <label for="qlik_icon_size"><?php esc_html_e('Click on the required icon to insert it in to your page or post', 'qlikview-syntax-highlighter'); ?></label>
            </div>
            <div class="content">
                <h4><?php esc_html_e('General Qlik Icons', 'qlikview-syntax-highlighter'); ?></h4>
                <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-qlik');"><i class="qicon-qlik qicon-lg"></i></a>
                <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-sense');"><i class="qicon-sense qicon-lg"></i></a>
                <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-qlikview');"><i class="qicon-qlikview qicon-lg"></i></a>

                <h4><?php esc_html_e('Qlik Sense User Interface Icons', 'qlikview-syntax-highlighter'); ?></h4>
                <div class="justify">
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-bars-vert');"><i class="qicon-bars-vert qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-bars-horiz');"><i class="qicon-bars-horiz qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-line-chart');"><i class="qicon-line-chart qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-pie-chart');"><i class="qicon-pie-chart qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-table-str');"><i class="qicon-table-str qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-table-piv');"><i class="qicon-table-piv qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-gauge');"><i class="qicon-gauge qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-grid');"><i class="qicon-grid qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-scatter-plot');"><i class="qicon-scatter-plot qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-map');"><i class="qicon-map qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-filter');"><i class="qicon-filter qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-text');"><i class="qicon-text qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-image');"><i class="qicon-image qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-kpi');"><i class="qicon-kpi qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-exp-edit');"><i class="qicon-exp-edit qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-sheets');"><i class="qicon-sheets qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-charts');"><i class="qicon-charts qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-data-model');"><i class="qicon-data-model qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-data-connections');"><i class="qicon-data-connections qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-select-possible');"><i class="qicon-select-possible qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-select-clear');"><i class="qicon-select-clear qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-select-undo');"><i class="qicon-select-undo qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-select-redo');"><i class="qicon-select-redo qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-bookmarks');"><i class="qicon-bookmarks qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-edit');"><i class="qicon-edit qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-undo');"><i class="qicon-undo qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-redo');"><i class="qicon-redo qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-help');"><i class="qicon-help qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-delete2');"><i class="qicon-delete2 qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-smart-search');"><i class="qicon-smart-search qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-date');"><i class="qicon-date qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-db');"><i class="qicon-db qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-export-data');"><i class="qicon-export-data qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-bold');"><i class="qicon-bold qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-italic');"><i class="qicon-italic qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-underline');"><i class="qicon-underline qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-justify-left');"><i class="qicon-justify-left qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-justify-right');"><i class="qicon-justify-right qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-justify-center');"><i class="qicon-justify-center qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-create-new');"><i class="qicon-create-new qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-cog');"><i class="qicon-cog qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-info');"><i class="qicon-info qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-audit');"><i class="qicon-audit qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-printing');"><i class="qicon-printing qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-nodes');"><i class="qicon-nodes qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-tag');"><i class="qicon-tag qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-filter-remove');"><i class="qicon-filter-remove qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-engines');"><i class="qicon-engines qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-unlock');"><i class="qicon-unlock qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-about');"><i class="qicon-about qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-extensions');"><i class="qicon-extensions qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-task-success');"><i class="qicon-task-success qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-list-view');"><i class="qicon-list-view qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-export');"><i class="qicon-export qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-expand');"><i class="qicon-expand qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-collapse');"><i class="qicon-collapse qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-debug');"><i class="qicon-debug qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-select-excluded');"><i class="qicon-select-excluded qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-users');"><i class="qicon-users qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-select-all');"><i class="qicon-select-all qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-timer');"><i class="qicon-timer qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-task-never');"><i class="qicon-task-never qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-task-aborted');"><i class="qicon-task-aborted qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-menu');"><i class="qicon-menu qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-add-data');"><i class="qicon-add-data qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-certificates');"><i class="qicon-certificates qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-load-data');"><i class="qicon-load-data qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-select-data');"><i class="qicon-select-data qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-cut');"><i class="qicon-cut qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-copy');"><i class="qicon-copy qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-data-manager');"><i class="qicon-data-manager qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-tree-map');"><i class="qicon-tree-map qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-indent');"><i class="qicon-indent qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-dedent');"><i class="qicon-dedent qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-security-rules');"><i class="qicon-security-rules qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-snapshot');"><i class="qicon-snapshot qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-qlik-folder');"><i class="qicon-qlik-folder qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-stories');"><i class="qicon-stories qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-data-load');"><i class="qicon-data-load qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-wizard');"><i class="qicon-wizard qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-variables');"><i class="qicon-variables qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-connection');"><i class="qicon-connection qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-delete');"><i class="qicon-delete qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-palette');"><i class="qicon-palette qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-paper-clip');"><i class="qicon-paper-clip qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-calendar');"><i class="qicon-calendar qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-user-directory');"><i class="qicon-user-directory qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-streams');"><i class="qicon-streams qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-license-tokens');"><i class="qicon-license-tokens qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-proxies');"><i class="qicon-proxies qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-line-chart-thin');"><i class="qicon-line-chart-thin qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-task-chain2');"><i class="qicon-task-chain2 qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-alert');"><i class="qicon-alert qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-link');"><i class="qicon-link qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-previous');"><i class="qicon-previous qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-next');"><i class="qicon-next qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-star');"><i class="qicon-star qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-folder');"><i class="qicon-folder qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-cube');"><i class="qicon-cube qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-refresh');"><i class="qicon-refresh qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-select-alternate');"><i class="qicon-select-alternate qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-area-chart');"><i class="qicon-area-chart qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-info2');"><i class="qicon-info2 qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-home');"><i class="qicon-home qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-step');"><i class="qicon-step qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-run');"><i class="qicon-run qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-hub');"><i class="qicon-hub qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-combo-chart2');"><i class="qicon-combo-chart2 qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-doughnut-chart');"><i class="qicon-doughnut-chart qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-lasso');"><i class="qicon-lasso qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-plug');"><i class="qicon-plug qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-combo-chart');"><i class="qicon-combo-chart qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-compass');"><i class="qicon-compass qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-read');"><i class="qicon-read qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-cloud');"><i class="qicon-cloud qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-comment');"><i class="qicon-comment qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-pause');"><i class="qicon-pause qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-task-failed');"><i class="qicon-task-failed qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-snapshot-library');"><i class="qicon-snapshot-library qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-associations');"><i class="qicon-associations qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-content-libraries');"><i class="qicon-content-libraries qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-other-access');"><i class="qicon-other-access qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-box-plot');"><i class="qicon-box-plot qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-distrib-plot');"><i class="qicon-distrib-plot qicon-lg"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qicon-histogram');"><i class="qicon-histogram qicon-lg"></i></a>
                </div>

                <h4><?php esc_html_e('QlikView User Interface Icons', 'qlikview-syntax-highlighter'); ?></h4>
                <div class="justify">
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-clear');"><i class="qvicon-clear"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-back');"><i class="qvicon-back"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-forward');"><i class="qvicon-forward"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-undo');"><i class="qvicon-undo"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-redo');"><i class="qvicon-redo"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-lock');"><i class="qvicon-lock"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-unlock');"><i class="qvicon-unlock"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-notes');"><i class="qvicon-notes"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-bookmark-add');"><i class="qvicon-bookmark-add"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-bookmark-remove');"><i class="qvicon-bookmark-remove"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-help');"><i class="qvicon-help"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-small-device');"><i class="qvicon-small-device"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-repository');"><i class="qvicon-repository"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-select-fields');"><i class="qvicon-select-fields"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-selections');"><i class="qvicon-selections"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-new-sheet-object');"><i class="qvicon-new-sheet-object"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-new-sheet-object');"><i class="qvicon-new-sheet-object"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-text-object');"><i class="qvicon-text-object"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-current-selections');"><i class="qvicon-current-selections"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-container');"><i class="qvicon-container"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-bookmark-object');"><i class="qvicon-bookmark-object"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-button-object');"><i class="qvicon-button-object"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-list-box');"><i class="qvicon-list-box"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-line-arrow');"><i class="qvicon-line-arrow"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-statistics-box');"><i class="qvicon-statistics-box"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-search-object');"><i class="qvicon-search-object"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-input-box');"><i class="qvicon-input-box"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-multi-box');"><i class="qvicon-multi-box"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-table-box');"><i class="qvicon-table-box"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-calendar');"><i class="qvicon-calendar"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-funel-chart');"><i class="qvicon-funel-chart"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-block-chart');"><i class="qvicon-block-chart"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-mekko-chart');"><i class="qvicon-mekko-chart"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-scatter-chart');"><i class="qvicon-scatter-chart"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-grid-chart');"><i class="qvicon-grid-chart"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-pivot-table');"><i class="qvicon-pivot-table"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-bar-chart');"><i class="qvicon-bar-chart"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-line-chart');"><i class="qvicon-line-chart"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-combo-chart');"><i class="qvicon-combo-chart"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-radar-chart');"><i class="qvicon-radar-chart"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-gauge-chart');"><i class="qvicon-gauge-chart"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-straight-table');"><i class="qvicon-straight-table"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-pie-chart');"><i class="qvicon-pie-chart"></i></a>
                    <a class="button" href="#" onclick="Insert_Container_Qlik_Icon('qvicon-slider');"><i class="qvicon-slider"></i></a>
                </div>
                <p>More coming soon!</p>
            </div>
        </div>

        <div class="buttons">
            <a class="button" href="#" onclick="tb_remove(); return true;" id="closeButton"><?php esc_html_e('Cancel', 'qlikview-syntax-highlighter'); ?></a>
        </div>
    </div>
</div>