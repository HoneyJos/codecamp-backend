import axios from 'axios';
import cheerio from 'cheerio';
import { User } from '../../models/user.model.js';
import { Token } from '../../models/token.model.js';

export class UserService {
  isValidUser = async (req, res) => {
    const phone = req.body.phone;
    const findToken = await Token.find({ phone })
    const isNotPhone = findToken.length === 0;
    const isAuth = findToken[0].isAuth;
    return !isNotPhone && isAuth
  }

  createMessage = async (req, res) => {
    // 입력된 메시지: "안녕하세요~ https://www.naver.com 에 방문해 주세요!"

    // 1. 입력된 메시지에서 http로 시작하는 문장이 있는지 먼저 찾기!(.find() 등의 알고리즘 사용하기)
    const url = req.body.prefer;

    // 2. axios.get으로 요청해서 html코드 받아오기 => 스크래핑
    const result = await axios.get(url);

    const og = {};

    // 3. 스크래핑 결과에서 OG(오픈그래프) 코드를 골라내서 변수에 담기 => cheerio 도움 받기
    const $ = cheerio.load(result.data);
    $("meta").each((index, el) => {
      if ($(el).attr("property") && $(el).attr("property").includes("og:") && !$(el).attr("property").includes("og:url")) {
        const key = $(el).attr("property").substring(3); // og:title, og:description ...
        const value = $(el).attr("content"); // 네이버, 네이버 메인에서 ~~~
        og[key] = value // 이부분 수정 필요, 계속 not defined 또는 promis뜨네
      }
    })
    return og
  }

  createModel = async (req, res, og) => {
    try {
      const personal = req.body.personal.substring(0, 7) + "*******"
      const result = await User.create({
        name: req.body.name,
        email: req.body.email,
        personal: personal,
        prefer: req.body.prefer,
        pwd: req.body.pwd,
        phone: req.body.phone,
        og: og
      })
      console.log(result)
      return true
    } catch (err) {
      console.error(err);
      return false
    }
  }
}