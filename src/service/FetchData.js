export default class FetchData {

  startUrl = 'https://api.spacexdata.com/v4/'

  // метод запроса с сервера
  getResource = async url => {
    const res = await fetch(url)

    // проверка на ошибки
    if (!res.ok) {
      throw new Error(`Ошибка ${res.status}`)
    }

    //  возвращаем json ответ
    return await res.json();
  };

  // получаем ракеты
  getRocket = async () =>
    await this.getResource(this.startUrl + 'rockets')

  // получаем даты запусков
  getLaunches = async () =>
    await this.getResource(this.startUrl + 'launches/past')

  // получаем инфа о комп
  getCompany = async () =>
    await this.getResource(this.startUrl + 'company')
}