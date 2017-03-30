function GetSource(path)
{
    var p = window.location.protocol + '//' + window.location.host + '/' + path;

    var request = new XMLHttpRequest();
    request.open('GET', p, false);
    request.send();

    return request.responseText;
}