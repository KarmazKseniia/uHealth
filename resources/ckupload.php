<?php
function transliterate($fileName) {
    $charReplace = array(
        'А' => 'A', 'Б' => 'B', 'В' => 'V',
        'Г' => 'G', 'Д' => 'D', 'Е' => 'E',
        'Ё' => 'E', 'Ж' => 'ZH', 'З' => 'Z',
        'И' => 'I', 'Й' => 'J', 'К' => 'K',
        'Л' => 'L', 'М' => 'M', 'Н' => 'N',
        'О' => 'O', 'П' => 'P', 'Р' => 'R',
        'С' => 'S', 'Т' => 'T', 'У' => 'U',
        'Ф' => 'F', 'Х' => 'H', 'Ц' => 'TS',
        'Ч' => 'CH', 'Ш' => 'SH', 'Щ' => 'SHH',
        'Ъ' => '', 'Ы' => 'I', 'Ь' => '',
        'Э' => 'E', 'Ю' => 'YU', 'Я' => 'YA',
        'а' => 'a', 'б' => 'b', 'в' => 'v',
        'г' => 'g', 'д' => 'd', 'е' => 'e',
        'ё' => 'yo', 'ж' => 'zh', 'з' => 'z',
        'и' => 'i', 'й' => 'j', 'к' => 'k',
        'л' => 'l', 'м' => 'm', 'н' => 'n',
        'о' => 'o', 'п' => 'p', 'р' => 'r',
        'с' => 's', 'т' => 't', 'у' => 'u',
        'ф' => 'f', 'х' => 'h', 'ц' => 'ts',
        'ч' => 'ch', 'ш' => 'sh', 'щ' => 'shh',
        'ъ' => '', 'ы' => 'i', 'ь' => '',
        'э' => 'e', 'ю' => 'yu', 'я' => 'ya',
        "№" => "N", " " => "_", "–" => "_",
        "-" => "_", " - " => "_", "," => "");
    $fileNameTranslited = str_replace(array_keys($charReplace), $charReplace, $fileName);
    return $fileNameTranslited;
}

$callback = $_GET['CKEditorFuncNum'];
$file_name = transliterate($_FILES['upload']['name']);
$file_path = 'img/' . $file_name;
$http_path = 'resources/' . $file_path;
$error = '';
if (move_uploaded_file($_FILES['upload']['tmp_name'], $file_path)) {
} else {
    $error = 'Some error occured please try again later';
    $http_path = '';
}
echo "<script type=\"text/javascript\">window.parent.CKEDITOR.tools.callFunction(" . $callback . ",  \"" . $http_path . "\", \"" . $error . "\" );</script>";
?>