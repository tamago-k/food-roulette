class RiceMenuController < ApplicationController
    MENUS = [
        { id: 1, name: "天津飯", description: "ふんわり卵がのった中華の定番" },
        { id: 2, name: "マック", description: "手軽で人気のファストフード" },
        { id: 3, name: "ラーメン", description: "熱々スープの中華麺" },
        { id: 4, name: "カレー", description: "スパイシーでコクのある定番メニュー" },
        { id: 5, name: "餃子", description: "パリッと焼き上げたおかず" },
        { id: 6, name: "牛丼", description: "甘辛い牛肉と玉ねぎの丼" },
        { id: 7, name: "インスタント焼きそば", description: "手軽に作れる屋台の味" },
        { id: 8, name: "きつねうどん", description: "甘辛揚げがのった和風うどん" },
        { id: 9, name: "お好み焼き", description: "ふわっとソースの関西名物" },
        { id: 10, name: "オムライス", description: "卵で包んだケチャップライス" },
        { id: 11, name: "ピザ", description: "チーズたっぷりの洋風ピザ" },
        { id: 12, name: "たこ焼き", description: "外はカリッと中はトロッと" },
        { id: 13, name: "とんかつ", description: "ジューシーな揚げ物" },
        { id: 14, name: "寿司", description: "新鮮なネタと酢飯の和食" },
        { id: 15, name: "焼きおにぎり", description: "香ばしく焼いたおにぎり" },
        { id: 16, name: "チャーハン", description: "パラッと炒めた中華飯" },
        { id: 17, name: "焼きそば", description: "ソースが決め手の麺料理" }
    ]

    def show
        menu = MENUS.sample
        render json: menu.slice(:id, :name, :description)
    end
end
