/*
 Language: SQL
 Contributors: Nikolay Lisienko <info@neor.ru>, Heiko August <post@auge8472.de>, Travis Odom <travis.a.odom@gmail.com>
 */

function(hljs) {
  var QV_EXP_KEYWORDS = {
    keyword: 'All Total Distinct',
	
    built_in: 'Acos Addmonths Addyears Age Alt Applycodepage Applymap Argb Asin Atan Atan2 Attribute Author Autonumber ' +
		'Autonumberhash128 Autonumberhash256 Avg ' +
		'Bitcount Black Blackandschole Blue Brown ' +
		'Capitalize Ceil Chi2test_chi2 Chi2test_df Chi2test_p Chidist Chiinv Chr Class Clientplatform Color ' +
		'Colormaphue Colormapjet Colormix1 Colormix2 Combin Computername Concat Connectstring Converttolocaltime ' +
		'Correl Cos Cosh Count Cyan ' +
		'Darkgray Date# Date Day Dayend Daylightsaving Dayname Daynumberofquarter Daynumberofyear Daystart Div ' +
		'DocumentName DocumentPath DocumentTitle Dual ' +
		'E Evaluate Even Exists Exp ' +
		'Fabs Fact False Fdist FieldIndex FieldName FieldNumber FieldValue FieldValueCount FileBaseName FileDir ' +
		'FileExtension FileName FilePath FileSize FileTime FindOneOf Finv FirstSortedValue FirstValue FirstWorkDate ' +
		'Floor Fmod Frac Fractile Fv ' +
		'GetExtendedProperty GetFolderPath GetObjectField GetRegistryString GMT Green ' +
		'Hash128 Hash160 Hash256 Hour HSL ' +
		'if InDay InDayToTime Index InLunarWeek InLunarWeekToDate InMonth InMonths InMonthsToDate InMonthToDate ' +
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
		'Num# NumAvg NumCount NumericCount NumMax NumMin NumSum ' +
		'Odd Only Ord OSUser ' +
		'Peek Permut Pi Pick Pmt pow Previous PurgeChar PV ' +
		'QlikTechBlue QlikTechGray QlikViewVersion QuarterEnd QuarterName QuarterStart QvdCreateTime QvdFieldName ' +
		'QvdNoOfFields QvdNoOfRecords QvdTableName QVUser ' +
		'Rand RangeAvg RangeCorrel RangeCount RangeFractile RangeIRR RangeKurtosis RangeMax RangeMaxString RangeMin ' +
		'RangeMinString RangeMissingCount RangeMode RangeNPV RangeNullCount RangeNumericCount RangeOnly RangeSkew ' +
		'RangeStdev RangeSum RangeTextCount RangeXIRR RangeXNPV Rate RecNo Red ReloadTime Repeat Replace ' +
		'ReportComment ReportId ReportName ReportNumber RGB Right Round RowNo RTrim ' +
		'Second SetDateYear SetDateYearMonth Sign sin sinh Skew sqr sqrt Stdev Sterr STEYX SubField|10 SubStringCount ' +
		'Sum SysColor ' +
		'TableName TableNumber tan tanh TDIST Text TextBetween TextCount Time Time# Timestamp Timestamp# TimeZone ' +
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
  var QV_EXP_STRING_SINGLE = {
        className: 'string',
        begin: '\'', end: '\'', //Gives a string when using single quotes
		illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE, {begin: '\'\''}],
			relevance: 0
  }
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
  return {
    aliases: ['qlikview-exp'],
	case_insensitive: true,
    keywords: QV_EXP_KEYWORDS, //Highlights all keywords and function names
    contains: [
      hljs.C_LINE_COMMENT_MODE, 
      hljs.C_BLOCK_COMMENT_MODE,
	  hljs.QUOTE_STRING_MODE,
	  QV_EXP_STRING_SINGLE,
	  QV_EXP_STRING_DOUBLE,
	  {
		className: 'field',
		begin: '\\[', end: '\\]', //Gives a field when using []
			relevance: 0
	  },
	  QV_EXP_VARIABLE_USE/*,
	  {
		className: 'load-statement',
        begin: '\\bload\\b', end: '\\bresident\\b',//'(\\bresident\\b|\\binline\\b|\\bfrom\\b|;\\bload\\b|;\\bsql\\b)',
        keywords: QV_KEYWORDS,
		contains: [
			hljs.C_LINE_COMMENT_MODE, //Gives a // comment
			hljs.C_BLOCK_COMMENT_MODE, //Gives a block comment
			hljs.QUOTE_STRING_MODE,
			QV_STRING_SINGLE,
			QV_STRING_DOUBLE,
			{
				className: 'field',
				begin: '\\b(\\w|\\[)', end: '(\\w|\\})\\b',
				keywords: QV_KEYWORDS
			}
		],
			relevance: 10
	  }*/
    ]
  };
}
