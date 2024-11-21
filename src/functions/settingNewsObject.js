export const settingNewsObject = (dataArray, setNewsData) => {
    const formattedData = dataArray.map(item => ({
        category: item.category,
        description: item.description,
        favicon: item.favicon,
        title: item.title,
        url: item.url,
        name: item.name,
        logo: item.logo,
    }));
    setNewsData(formattedData);
};


