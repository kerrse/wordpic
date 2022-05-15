<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <link href="wordpic.css" rel="stylesheet" type="text/css"/>
  <title>WordPic</title>
</head>
<body>
<div id="nav">
  <a href="index.html" id="home">Home</a>
  <span>WordPic</span>
  <span id="level_number">Level</span>
</div>

<div id="grid">
  <div id="pic_1">
    <figure>
      <img class="pics"/>
      <figcaption class="pics_word"></figcaption>
    </figure>
  </div>

  <div><div id="add">&#x2795;</div></div>

  <div id="pic_1">
    <figure>
      <img class="pics"/>
      <figcaption class="pics_word"></figcaption>
    </figure>
  </div>
</div>
  <br/>
<div id="spots"></div>
  <br/>
<div id="letters"></div>

<div id="scoreboard">
  <span id="close">X<span>
  <div id="result"></div>
  <div id="options">
    <button class="opts">Previous Level</button>
    <button class="opts">Next Level</button>
  </div>
</div>
</body>
<script src="answers.js"></script>
<script type="text/javascript">
  const urlParameter = new URLSearchParams(window.location.search);
  const level = urlParameter.get("level");
</script>

<?php
  // ini_set('display_errors', 1);
  $q_flag = false;
  $url_name = "";

  for ($i = 0; $i < strlen($_SERVER['REQUEST_URI']); $i++) {
    if ($_SERVER['REQUEST_URI'][$i] == '=') {
      $q_flag = true;
    }
    if ($q_flag) {
      $url_name .= $_SERVER['REQUEST_URI'][$i + 1]; // $i + 1 skips the equal sign in the url
    }
  }

  $pic_dir = scandir('pic-info/pics/' . $url_name);

  for ($i = 0; $i < count($pic_dir); $i++) {
    $pics[$i] = pathinfo($pic_dir[$i], PATHINFO_FILENAME);
    $endings[$i] = pathinfo($pic_dir[$i])['extension'];
  }
?>
<script type="text/javascript">
  const pics = <?php echo json_encode($pics); ?>;
  const endings = <?php echo json_encode($endings); ?>;
</script>
<script src="wordpic.js"></script>
</html>
