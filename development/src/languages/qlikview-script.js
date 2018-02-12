/*
	Language: QlikView Script
	Contributors: Matthew Fryer <matthew_fryer@hotmail.com>
*/
 
/*
	Notes:
	Forward look for a bracket (?=(\\(|$))
	Built in items are:
		hljs.C_LINE_COMMENT_MODE, //Gives a // comment
		hljs.C_BLOCK_COMMENT_MODE, //Gives a block comment
	Variable definitions could be improved to include whole statement and its contained parts
	Need to gave a way to deal with field names in WHERE, WHILE, ORDER BY and GROUP BY clauses of load statements to be  highlighted. Can be on preceding loads and froms, residents, etc
	Identification of field names is repeated. Break out into variable
*/

(function(hljs) {
	var QVS_KEYWORDS = {
		keyword: 'Add Alias And As Autogenerate|10 ' +
			'Binary Buffer ' +
			'Call Case Comment Concatenate Connect Crosstable Custom ' +
			'Default Derive Detail Dimension Directory Disconnect Distinct Do ' +
			'Each Else Elseif Endif Endsub Endswitch Execute ' +
			'First FlushLog For Force From From_Field ' +
			'Generic ' +
			'Hierarchy|10 HierarchyBelongsTo|10 ' +
			'if In Inline Inputfield|10 Intervalmatch|10 Into ' +
			'join ' + 
			'Let Lib Loop Loosen ' +
			'Map Measure ' +
			'Native Next Noconcatenate|10 Not NullAsNull NullAsValue ' +
			'ODBC OLEDB Or ' +
			'Qualify ' +
			'Replace Resident ' +
			'Sample Script Section Select Semantic Set Sleep SQL SQLColumns SQLTables SQLTypes Star Step Store Sub ' +
			'Switch ' +
			'Then To Trace ' +
			'Unless Unmap Unqualify Untag Using ' +
			'When Where With',
	  
		built_in: 'Acos Addmonths Addyears Age Alt Applycodepage Applymap Argb Asin Atan Atan2 Attribute Author Autonumber ' +
			'Autonumberhash128 Autonumberhash256 Avg ' +
			'Bitcount Black Blackandschole Blue Brown ' +
			'Capitalize Ceil Chi2test_chi2 Chi2test_df Chi2test_p Chidist Chiinv Chr Class Clientplatform Color ' +
			'Colormaphue Colormapjet Colormix1 Colormix2 Combin Computername Concat Connectstring Converttolocaltime ' +
			'Correl Cos Cosh Count Cyan ' +
			'Darkgray Day Dayend Daylightsaving Dayname Daynumberofquarter Daynumberofyear Daystart Div ' +
			'DocumentName DocumentPath DocumentTitle Dual ' +
			'E Evaluate Even Exists Exp ' +
			'Fabs Fact False Fdist FieldIndex FieldName FieldNumber FieldValue FieldValueCount FileBaseName FileDir ' +
			'FileExtension FileList FileName FilePath FileSize FileTime FindOneOf Finv FirstSortedValue FirstValue FirstWorkDate ' +
			'Floor Fmod Frac Fractile Fv ' +
			'GetExtendedProperty GetFolderPath GetObjectField GetRegistryString GMT Green ' +
			'Hash128 Hash160 Hash256 Hour HSL ' +
			'InDay InDayToTime Index InLunarWeek InLunarWeekToDate InMonth InMonths InMonthsToDate InMonthToDate ' +
			'Input InputAvg InputSum InQuarter InQuarterToDate Interval Interval# InWeek InWeekToDate InYear ' +
			'InYearToDate IRR IsNull IsNum IsPartialReload IsText IterNo ' +
			'KeepChar Kurtosis ' +
			'LastValue LastWorkDate Len LightBlue LightCyan LightGray LightGreen LightMagenta LightRed LINEST_B ' +
			'LINEST_DF LINEST_F LINEST_M LINEST_R2 LINEST_SEB LINEST_SEM LINEST_SEY LINEST_SSREG LINEST_SSRESID ' +
			'LocalTime log log10 Lookup Lower LTrim LunarWeekEnd LunarWeekName LunarWeekStart ' +
			'Magenta MakeDate MakeTime MakeWeekDate MapSubString Match Max MaxString Median Mid Min MinString Minute ' +
			'MissingCount MixMatch Mod Mode Money Money# Month MonthEnd MonthName MonthsEnd MonthsName MonthsStart ' +
			'MonthStart MsgBox ' +
			'NetWorkDays NoOfFields NoOfReports NoOfRows NoOfTables NORMDIST NORMINV Now nPer NPV Null NullCount Num ' +
			'Num NumAvg NumCount NumericCount NumMax NumMin NumSum ' +
			'Odd Only Ord OSUser ' +
			'Peek Permut Pi Pick Pmt pow Previous PurgeChar PV ' +
			'QlikTechBlue QlikTechGray QlikViewVersion QuarterEnd QuarterName QuarterStart QvdCreateTime QvdFieldName ' +
			'QvdNoOfFields QvdNoOfRecords QvdTableName QVUser ' +
			'Rand RangeAvg RangeCorrel RangeCount RangeFractile RangeIRR RangeKurtosis RangeMax RangeMaxString RangeMin ' +
			'RangeMinString RangeMissingCount RangeMode RangeNPV RangeNullCount RangeNumericCount RangeOnly RangeSkew ' +
			'RangeStdev RangeSum RangeTextCount RangeXIRR RangeXNPV Rate RecNo Red ReloadTime Repeat Replace ' +
			'ReportComment ReportId ReportName ReportNumber RGB Round RowNo RTrim ' +
			'Second SetDateYear SetDateYearMonth Sign sin sinh Skew sqr sqrt Stdev Sterr STEYX SubField|10 SubStringCount ' +
			'Sum SysColor ' +
			'TableName TableNumber tan tanh TDIST Text TextBetween TextCount TimeZone ' +
			'TINV Today Trim True TTest1_conf TTest1_df TTest1_dif TTest1_lower TTest1_sig TTest1_sterr TTest1_t ' +
			'TTest1_upper TTest1w_conf TTest1w_df TTest1w_dif TTest1w_lower TTest1w_sig TTest1w_sterr TTest1w_t ' +
			'TTest1w_upper TTest_conf TTest_df TTest_dif TTest_lower TTest_sig TTest_sterr TTest_t TTest_upper ' +
			'TTestw_conf TTestw_df TTestw_dif TTestw_lower TTestw_sig TTestw_sterr TTestw_t TTestw_upper ' +
			'Upper UTC ' +
			'Week WeekDay WeekEnd WeekName WeekStart WeekYear White WildMatch WildMatch5 ' +
			'XIRR XNPV ' +
			'Year Year2Date YearEnd YearName YearStart YearToDate Yellow ' +
			'ZTest_conf ZTest_dif ZTest_lower ZTest_sig ZTest_sterr ZTest_upper ZTest_z ZTestw_conf ZTestw_dif ' +
			'ZTestw_lower ZTestw_sig ZTestw_sterr ZTestw_upper ZTestw_z',
	};
	var QVS_KEYWORD_COMBINATIONS = { //Deals with the correct highlighting of keywords that are only valid in combinations
		className: 'keyword',
		begin: '\\b(left\\s+join|right\\s+join|inner\\s+join|outer\\s+join|left\\s+keep|right\\s+keep|\\inner\\s+keep|drop\\s+table|drop\\s+tables|drop\\s+field|drop\\s+fields|exit\\s+script|exit\\s+sub|exit\\s+for|exit\\s+do|exit\\s+switch|rename\\s+table|rename\\s+field|bundle\\s+image_size|tag\\s+field|tag\\s+fields|end\\s+if|end\\s+sub|end\\s+switch|do\\s+while|do\\s+until|loop\\s+while|loop\\s+until|group\\s+by)\\b',
		keywords: 'left right inner outer join keep drop tag rename table tables field fields exit script sub for do switch image_size group by end if loop while until'
	};
	var QVS_HASH_FUNCTIONS = { //Deals with the correct highlighting of the functions that have an interpretation version eg. date() and date#()
		className: 'built_in',
		begin: '\\b(date|interval|money|num|time|timestamp)#?\\s*(?=(\\(|$))', 
		illegal: '\\n'
	};
	var QVS_KEYWORD_FUNCTIONS = { //Deals with the correct highlighting of the functions that have a keyword with the same name eg. if, left, right, etc
		className: 'built_in',
		begin: '\\b(if|left|right)\\s*(?=(\\(|$))', 
		illegal: '\\n',
	};
	var QVS_STRING_SINGLE = { //Gives a string when using single quotes
		className: 'string',
		begin: '\'', end: '\'',
		illegal: '\\n',
		relevance: 0
	};
	var QVS_STRING_DOUBLE = { //Gives a string when using double quotes
		className: 'string', 
		begin: '"', end: '"',
		illegal: '\\n',
		relevance: 0
	};
	var QVS_REM_COMMENT = { //Gives a REM comment. Correctly matches when it is at the start of a line only.
		className: 'comment', 
		begin: '\^\\s*rem\\b', end: ';',
		relevance: 10
	};
	var QVS_VARIABLE_DEF = { //Gives a variable definition when using SET or LET
		className: 'variable', 
		begin: '\\b(let|set)\\s+', end: '\\w+[\\w.]*',
		keywords: 'set let',
		illegal: '\\n',
		relevance: 10
	};
	var QVS_VARIABLE_USE = { //Gives a variable when used inside $()
		className: 'variable',
		begin: '\\$\\(', end: '\\)', 
		illegal: '\\n',
		relevance: 10
	};
	var QVS_BRACED_FIELD = { //Gives a field when using square braces []
		className: 'field',
		begin: '\\[', end: '\\]', 
		relevance: 0
	};
	var QVS_FIELD = {
		className: 'field', //Identifies field names within the direct query statement
		begin: '\\b[a-zA-Z_][a-zA-Z0-9_-]*\\b',
		keywords: QVS_KEYWORDS,
		illegal: '\n\s',
		contains: [
			QVS_HASH_FUNCTIONS,
		  	QVS_KEYWORD_FUNCTIONS,
		]
	};
	return {
		aliases: ['qvs','qlikview'],
		case_insensitive: true,
		keywords: QVS_KEYWORDS,
		contains: [
			hljs.C_LINE_COMMENT_MODE, 
			hljs.C_BLOCK_COMMENT_MODE,
			QVS_KEYWORD_COMBINATIONS,
			QVS_HASH_FUNCTIONS,
			QVS_KEYWORD_FUNCTIONS,
			QVS_STRING_SINGLE,
			QVS_STRING_DOUBLE,
			QVS_REM_COMMENT,
			QVS_VARIABLE_DEF,
			QVS_VARIABLE_USE,
			{
				className: 'sql_statement', //Ensures SQL statements are identified to stop other keywords being highlighted within them
				begin: '\\bsql\\b', end: ';',
				keywords: 'sql',
				contains: [
					hljs.C_LINE_COMMENT_MODE, 
					hljs.C_BLOCK_COMMENT_MODE,
					QVS_STRING_SINGLE,
					QVS_STRING_DOUBLE,
					QVS_VARIABLE_USE
				],
				relevance: 0
			},
			{
				className: 'direct_query_statement', //Identifies direct query statements 
				begin: '\\bdirect\\s+query\\b', end: ';',
				keywords: 'direct query',
				contains: [
					hljs.C_LINE_COMMENT_MODE,
					hljs.C_BLOCK_COMMENT_MODE,
					QVS_HASH_FUNCTIONS,
					QVS_KEYWORD_FUNCTIONS,
					QVS_STRING_SINGLE,
					QVS_STRING_DOUBLE,
					QVS_VARIABLE_USE,
					{
						className: 'direct_query_from', //Identifies if the load statement has a source rather than it being a preceding load.
						begin: '\\bfrom\\b', end: '(?=(;|$))',
						keywords: QVS_KEYWORDS, 
						contains: [
							hljs.C_LINE_COMMENT_MODE, 
							hljs.C_BLOCK_COMMENT_MODE, 
							QVS_STRING_SINGLE,
							QVS_STRING_DOUBLE,
							QVS_VARIABLE_USE
						]
					},
					QVS_BRACED_FIELD,
					QVS_FIELD
				],
				relevance: 10
			},
			{
				className: 'load_statement', //Identifies load statements 
				begin: '\\b(mapping\\s+load|bundle\\s+info\\s+load|info\\s+load|load)\\b', end: ';',
				keywords: 'load mapping bundle info as distinct',
				contains: [
					hljs.C_LINE_COMMENT_MODE,
					hljs.C_BLOCK_COMMENT_MODE,
					QVS_HASH_FUNCTIONS,
					QVS_KEYWORD_FUNCTIONS,
					QVS_KEYWORD_COMBINATIONS,
					QVS_STRING_SINGLE,
					QVS_STRING_DOUBLE,
					QVS_VARIABLE_USE,
					{
						className: 'load_source', //Identifies if the load statement has a source rather than it being a preceding load.
						begin: '\\b(resident|inline|autogenerate|from)\\b', end: '(?=(;|$))',
						keywords: QVS_KEYWORDS, 
						contains: [
							hljs.C_LINE_COMMENT_MODE, 
							hljs.C_BLOCK_COMMENT_MODE, 
							QVS_HASH_FUNCTIONS,
							QVS_KEYWORD_FUNCTIONS,
							QVS_KEYWORD_COMBINATIONS,
							QVS_STRING_SINGLE,
							QVS_STRING_DOUBLE,
							QVS_VARIABLE_USE,
							{
								className: 'format_specification', //Identifies the format specification contained in braces ()
								begin: '\\(', end: '\\)',
								keywords: {
									format_specification_items: 'ansi oem mac UTF-8 Unicode txt fix dif biff ooxml html xml qvd ' +
										'delimiter is no eof embedded labels explicit no table header line lines comment record ' +
										'quotes msq filters'
								},
								contains: [
									hljs.C_LINE_COMMENT_MODE, 
									hljs.C_BLOCK_COMMENT_MODE,
									QVS_STRING_SINGLE,
									QVS_STRING_DOUBLE,
									QVS_VARIABLE_USE,
								]
							}
						],
						relevance: 10
					},
					QVS_BRACED_FIELD,
					QVS_FIELD
				],
				relevance: 10
			}
		]
	};
})
