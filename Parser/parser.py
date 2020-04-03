
from selenium import webdriver
from threading import Thread
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import json
import os.path


domen = "https://lekopttorg.ru"
url1 = "https://lekopttorg.ru/catalog/?q="
url2 = "&s="


def findPreparat(namePreparat, prep):
    try:
        chromedriver = 'chromedriver'
        options = webdriver.ChromeOptions()
        # options.add_argument('headless')  # для открытия headless-браузера
        browser = webdriver.Chrome(
            executable_path=chromedriver, chrome_options=options)

        browser.get(url1 + namePreparat + url2)

        # Получение HTML-содержимого
        srcs = browser.find_elements_by_xpath("//div[@class='photo']/a")

        for src in srcs:
            src = src.get_attribute('href')

            # запускаем новый браузер
            newBrowser = webdriver.Chrome(
                executable_path=chromedriver, chrome_options=options)
            newBrowser.get(src)

            try:
                # Вытаскиваем имя
                name = newBrowser.find_elements_by_xpath(
                    "//h1[@itemprop='name']")
                if len(name) == 0:
                    return True
                name = name[0].text
            except ValueError:
                print(ValueError)
                newBrowser.close()
                return False
            # заполняем словарь
            p = {}
            prep[name] = p
            print(name)
            try:
                # Ссылка на картику
                srcImg = newBrowser.find_elements_by_xpath(
                    "//div[@class='product-photo']/img")
                if len(srcImg) == 0:
                    return True
                srcImg = srcImg[0].get_attribute('src')
            except ValueError:
                print(ValueError)
                newBrowser.close()
                return False

            prep[name]["srcImg"] = srcImg

            try:
                # Цена
                price = newBrowser.find_elements_by_xpath(
                    "//div[@class='price']/meta")
                if len(price) == 0:
                    return True
                price = price[0].get_attribute('content')

            except ValueError:
                print(ValueError)
                newBrowser.close()
                return False

            prep[name]["price"] = price

            try:
                # Открываем список аптек
                el = newBrowser.find_elements_by_xpath(
                    "//a[@id='os_pharm_link']")
                if len(el) == 0:
                    return True
                el[0].click()
            except ValueError:
                print(ValueError)
                newBrowser.close()
                return False

            # Прокручиваем в низ, для загрузки списка

            for x in range(10, 1, -1):
                newBrowser.execute_script(
                    "window.scrollTo(0, document.body.scrollHeight/" + str(x) + ");")

            for x in range(1, 3):
                newBrowser.execute_script(
                    "window.scrollTo(0, document.body.scrollHeight/" + str(x) + ");")

            try:
                # Ждем появления списка
                stores = WebDriverWait(newBrowser, 60).until(
                    EC.presence_of_element_located((By.XPATH, "//div[@class='store-name']")))

            except ValueError:
                print(ValueError)
                newBrowser.close()
                return False

            try:
                # Получаем все аптеки
                stores = newBrowser.find_elements_by_xpath(
                    "//div[@class='store-info']")
            except ValueError:
                print(ValueError)
                newBrowser.close()
                return False

            list1 = []
            prep[name]["location"] = list1

            # Находим аптеки в Петрозаводске
            for store in stores:
                text = store.text
                if text.find("Петрозаводск") != -1:
                    prep[name]["location"].append(text)

            # закрываем брайзер
            newBrowser.close()

        return True

    except ValueError:
        print(ValueError)
        browser.close()
        return False

    browser.close()


def start():
        # загружаем все названия препаратов
    with open("../TradeNameMedicaments.json", "r", encoding='utf-8') as read_file:
        data = json.load(read_file)

    i = 0
    # проходим по каждому названию и запускаем парсер
    for name in data:
        if not os.path.exists("Info/" + name + ".json"):
            prep = dict()
            if findPreparat(name, prep):
                    # сохраняем информацию по препарату
                with open("Info/" + name + ".json", "w", encoding='utf-8') as write_file:
                    json.dump(prep, write_file, ensure_ascii=False, indent=2)
                    write_file.close()
            else:
                with open("Error.txt", "r", encoding='utf-8') as read_file:
                    allError = read_file
                    read_file.close()
                allError += name + "\n"
                with open("Error.txt", "w", encoding='utf-8') as write_file:
                    write_file.write(allError)
                    write_file.close()
            i += 1
            if i == 10:
                break


start()
