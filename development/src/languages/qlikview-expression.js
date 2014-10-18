/*
 Language: QlikView Expressions
 Contributors: Matthew Fryer <matthew_fryer@hotmail.com>
 */

function(hljs) {
  var QV_EXP_KEYWORDS = {
    function_keyword: 'All Total Distinct Nodistinct',
	
    built_in: 'Above acos AddMonths AddYears After Age Aggr Alt ApplyCodepage ApplyMap ARGB asin atan atan2 Author Avg ' +
		'Before Below BitCount Black BlackAndSchole Blue Bottom Brown ' +
		'Capitalize Ceil Chi2Test_chi2 Chi2Test_df Chi2Test_p CHIDIST CHIINV Chr Class ClientPlatform Color ColorMapHue ' +
		'ColorMapJet ColorMix1 ColorMix2 Column ColumnNo Combin ComputerName Concat ConvertToLocalTime Correl cos cosh ' +		'Count Cyan ' +
		'DarkGray Day DayEnd DaylightSaving DayName DayNumberOfQuarter DayNumberOfYear DayStart Dimensionality ' +
		'Div DocumentName DocumentPath DocumentTitle Dual ' +
		'e Even exp ' +
		'fabs Fact False FDIST FieldIndex FieldValue FieldValueCount FindOneOf FINV First FirstSortedValue FirstWorkDate ' +
		'Floor fmod Frac Fractile FV ' +
		'GetActiveSheetId GetAlternativeCount GetCurrentField GetCurrentSelections GetExcludedCount GetExtendedProperty ' +
		'GetFieldSelections GetNotSelectedCount GetObjectField GetPossibleCount GetRegistryString GetSelectedCount GMT ' +
		'Green ' +
		'Hash128 Hash160 Hash256 Hour HRank HSL ' +
		'If InDay InDayToTime Index Info InLunarWeek InLunarWeekToDate InMonth InMonths InMonthsToDate InMonthToDate ' +
		'InputAvg InputSum InQuarter InQuarterToDate InWeek InWeekToDate InYear InYearToDate IRR IsNull ' +
		'IsNum IsText ' +
		'KeepChar Kurtosis ' +
		'Last LastWorkDate Left Len LightBlue LightCyan LightGray LightGreen LightMagenta LightRed LINEST_B LINEST_DF ' +
		'LINEST_F LINEST_M LINEST_R2 LINEST_SEB LINEST_SEM LINEST_SEY LINEST_SSREG LINEST_SSRESID LocalTime log log10 ' +
		'Lower LTrim LunarWeekEnd LunarWeekName LunarWeekStart ' +
		'Magenta MakeDate MakeTime MakeWeekDate MapSubString Match Max MaxString Median Mid Min MinString Minute ' +
		'MissingCount MixMatch Mod Mode Month MonthEnd MonthName MonthsEnd MonthsName MonthsStart MonthStart ' +
		'NATIVE NetWorkDays NoOfColumns NoOfReports NoOfRows NORMDIST NORMINV Now nPer NPV Null NullCount NumAvg ' +
		'NumCount NumericCount NumMax NumMin NumSum ' +
		'Odd Only Ord OSUser ' +
		'Permut Pi Pick Pmt pow PurgeChar PV ' +
		'QlikTechBlue QlikTechGray QlikViewVersion QuarterEnd QuarterName QuarterStart QVUser ' +
		'Rand RangeAvg RangeCorrel RangeCount RangeFractile RangeIRR RangeKurtosis RangeMax RangeMaxString RangeMin ' +
		'RangeMinString RangeMissingCount RangeMode RangeNPV RangeNullCount RangeNumericCount RangeOnly RangeSkew ' +
		'RangeStdev RangeSum RangeTextCount RangeXIRR RangeXNPV Rank Rate Red ReloadTime Repeat Replace ReportComment ' +
		'ReportId ReportName ReportNumber RGB Right Round RowNo RTrim ' +
		'Second SecondaryDimensionality SetDateYear SetDateYearMonth Sign sin sinh Skew sqr sqrt StateName Stdev Sterr ' +
		'STEYX SubField SubStringCount Sum SysColor ' +
		'tan tanh TDIST Text TextBetween TextCount TimeZone TINV Today Top Trim True ' +
		'TTest1_conf TTest1_df TTest1_dif TTest1_lower TTest1_sig TTest1_sterr TTest1_t TTest1_upper TTest1w_conf ' +
		'TTest1w_df TTest1w_dif TTest1w_lower TTest1w_sig TTest1w_sterr TTest1w_t TTest1w_upper TTest_conf TTest_df ' +
		'TTest_dif TTest_lower TTest_sig TTest_sterr TTest_t TTest_upper TTestw_conf TTestw_df TTestw_dif TTestw_lower ' +
		'TTestw_sig TTestw_sterr TTestw_t TTestw_upper ' +
		'Upper UTC ' +
		'ValueList ValueLoop VRank ' +
		'Week WeekDay WeekEnd WeekName WeekStart WeekYear White WildMatch WildMatch5 ' +
		'XIRR XNPV ' +
		'Year Year2Date YearEnd YearName YearStart YearToDate Yellow ' +
		'ZTest_conf ZTest_dif ZTest_lower ZTest_sig ZTest_sterr ZTest_upper ZTest_z ZTestw_conf ZTestw_dif ZTestw_lower ' +
		'ZTestw_sig ZTestw_sterr ZTestw_upper ZTestw_z'		
  };
  var QV_EXP_HASH_FUNCTIONS = { //Deals with the correct highlighting of the functions that have an interpretation version eg. date() and date#()
		className: 'built_in',
		begin: '\\b(date|interval|money|num|time|timestamp)\\b#?\\s?', //Tried to add look forward but seems to cause it to fail (?=\()
		illegal: '\\n',
  };
  var QV_EXP_STRING_SINGLE = {
        className: 'string',
        begin: '\'', end: '\'', //Gives a string when using single quotes
		illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE, {begin: '\'\''}],
			relevance: 0
  };
  var QV_EXP_STRING_DOUBLE = {
		className: 'string',
        begin: '"', end: '"', //Gives a string when using double quotes
		illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE, {begin: '""'}],
			relevance: 0
  };
  var QV_EXP_VARIABLE_USE = {
	    className: 'variable',
		begin: '\\$\\(', end: '\\)', //Gives a variable when used inside $()
		illegal: '\\n',
			relevance: 10
  };
  var QV_EXP_BRACED_FIELD = {
		className: 'field',
		begin: '\\[', end: '\\]', //Gives a field when using []
			relevance: 0
  };
  return {
    aliases: ['exp', 'qve','qlikview-exp','qv-exp'],
	case_insensitive: true,
    keywords: QV_EXP_KEYWORDS, //Highlights all keywords and function names
    contains: [
      hljs.C_LINE_COMMENT_MODE, 
      hljs.C_BLOCK_COMMENT_MODE,
	  hljs.QUOTE_STRING_MODE,
	  QV_EXP_HASH_FUNCTIONS,
	  QV_EXP_STRING_SINGLE,
	  QV_EXP_STRING_DOUBLE,
	  QV_EXP_VARIABLE_USE,
	  QV_EXP_VARIABLE_USE,
	  {
		className: 'total-modifier',
        begin: '<', end: '>',
		contains: [
			hljs.C_LINE_COMMENT_MODE, //Gives a // comment
			hljs.C_BLOCK_COMMENT_MODE, //Gives a block comment
			QV_EXP_BRACED_FIELD,
			{
				className: 'field',
				begin: '\\b[a-zA-Z_][a-zA-Z0-9_-]*\\b', 
				illegal: '\n\s',
			}
		],
			relevance: 10
	  },
	  {
		className: 'set-analysis',
        begin: '\\{', end: '\\}',
		contains: [
			hljs.C_LINE_COMMENT_MODE, //Gives a // comment
			hljs.C_BLOCK_COMMENT_MODE, //Gives a block comment
			{
				begin: '\\{', end: '\\}',
				contains: [
					hljs.C_LINE_COMMENT_MODE, //Gives a // comment
					hljs.C_BLOCK_COMMENT_MODE, //Gives a block comment
					{
						className: 'set-analysis-quotes',
						begin: '"', end: '"',
						illegal: '\n\s',
					}
				]
			},
			{
				className: 'field',
				begin: '\\b[a-zA-Z_][a-zA-Z0-9_-]*\\b',
			}
		]
	  },
	  QV_EXP_BRACED_FIELD,
	  {
		className: 'field',
		keywords: QV_EXP_KEYWORDS, //Highlights all keywords and function names
		begin: '\\b[a-zA-Z_][a-zA-Z0-9_-]*\\b', 
		illegal: '\n\s',
      }
    ]
  };
}
