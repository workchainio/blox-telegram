class Keyword{

	constructor(keyword){
		this.negative = keyword.indexOf('!') === 0;
		if(this.negative){
			this.keyword = keyword.substr(1);
		}else{
			this.keyword = keyword;
		}
	}

	match(text){
		if(this.negative){
			return !text.includes(this.keyword);
		}else{
			return text.includes(this.keyword);
		}
	}
}

exports.Keyword = Keyword;