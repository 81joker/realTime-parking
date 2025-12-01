
echo "Running deploy script on remote host: $(hostname)"

echo "Repository remotes:"
git remote -v || true

BRANCH="${{ github.ref_name }}"
if [ -z "$BRANCH" ]; then
BRANCH="main"
fi
echo "Deploying branch: $BRANCH"

echo "[1/6] Fetching remotes"
git fetch --all --prune || echo "git fetch failed (continuing to try pull)"

echo "[2/6] Resetting to origin/$BRANCH (will discard local changes)"
if ! git reset --hard origin/"$BRANCH"; then
echo "Reset failed — attempting git pull origin $BRANCH"
git pull origin "$BRANCH" || { echo "git pull also failed"; exit 1; }
fi

echo "[3/6] Ensure database file exists"
touch database/database.sqlite

echo "[4/6] Installing composer dependencies (remote)"
composer install --no-interaction --prefer-dist --no-dev --optimize-autoloader

echo "[5/6] Running artisan tasks"
php artisan migrate --force
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

echo "[6/6] Fix permissions and finish"
chown -R www-data:www-data storage bootstrap/cache || true

echo "Deployed commit:"
git --no-pager log -1 --pretty=oneline

echo "The app has been built and deployed!"