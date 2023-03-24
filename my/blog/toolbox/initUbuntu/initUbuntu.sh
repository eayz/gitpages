sudo sed -i "s@http://.*archive.ubuntu.com@https://mirrors.tuna.tsinghua.edu.cn@g" /etc/apt/sources.list
sudo sed -i "s@http://.*security.ubuntu.com@https://mirrors.tuna.tsinghua.edu.cn@g" /etc/apt/sources.list
sudo apt update
sudo apt upgrade
sudo apt install python3-pip git cmake nodejs npm neofetch
python3 -m pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --upgrade pip
neofetch
pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple d2l jupyterlab
sudo apt-get install ruby-full build-essential zlib1g-dev


echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc


gem install jekyll bundler
