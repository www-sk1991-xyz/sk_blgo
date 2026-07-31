import os
import zipfile

def create_edgeone_zip():
    """创建符合EdgeOne要求的zip文件"""

    # 要打包的文件和目录
    items = [
        'index.html',
        'post.html',
        'about.html',
        'css',
        'js',
        'posts',
        'data',
        'assets'
    ]

    zip_name = 'blog-edgeone-deploy.zip'

    # 删除旧的zip文件
    if os.path.exists(zip_name):
        os.remove(zip_name)

    # 创建新的zip文件
    with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for item in items:
            if os.path.isfile(item):
                # 添加单个文件
                zipf.write(item, item)
                print(f'添加文件: {item}')
            elif os.path.isdir(item):
                # 添加目录中的所有文件
                for root, dirs, files in os.walk(item):
                    for file in files:
                        file_path = os.path.join(root, file)
                        # 使用正斜杠作为路径分隔符
                        arcname = file_path.replace('\\', '/')
                        zipf.write(file_path, arcname)
                        print(f'添加文件: {arcname}')

    print(f'\n压缩包创建成功: {zip_name}')
    print(f'文件大小: {os.path.getsize(zip_name) / 1024:.2f} KB')

if __name__ == '__main__':
    create_edgeone_zip()